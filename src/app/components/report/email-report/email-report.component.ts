import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, DoCheck, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerDirective, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ReportService } from '../services/report.service';
import JSZip from 'jszip'; 
import { saveAs } from 'file-saver';
import { ReportUtilsService } from '../services/report-utils.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-email-report',
  imports: [NgIf, NgFor,ReactiveFormsModule, BsDatepickerModule, FormsModule, DashboardComponent, NgxEchartsModule],
  templateUrl: './email-report.component.html',
  styleUrl: './email-report.component.scss'
})
export class EmailReportComponent implements DoCheck {
  error: string = "";
  dateStart = new FormControl('', [Validators.required, this.dateValidator.bind(this)]);
  dateEnd = new FormControl('', [Validators.required, this.dateValidator.bind(this)]);

  reports: any[] = [];
  groupedReports: any[] = [];
  statuses: string[] = ["bounced", "dispatched", "rejected", "sent", "skipped"];
  selectedStatus: string = '';
  records: number = 0;
  report_generated = false;
  summary_generated = false;
  
  options = [
    { value: 'adt_accno', text: 'adt_accno' },
    { value: 'adt_accno1', text: 'adt_accno1' },
    { value: 'adt_accno2', text: 'adt_accno2' },
    { value: 'adt_accno3', text: 'adt_accno3' },
    { value: 'adt_accno4', text: 'adt_accno4' }
  ];

  bsConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-dark-blue',  // Change theme (use 'theme-dark-blue', 'theme-red', etc.)
    showWeekNumbers: false,  // Hide week numbers
    adaptivePosition: true,  // Ensures correct positioning
    dateInputFormat: 'YYYY-MM-DD', // Customize date format
    minDate: new Date(2020, 0, 1),  // Set minimum selectable date
    maxDate: new Date(),  // Restrict to current date
    customTodayClass: 'custom-today' // Custom class for today’s date
  };

  constructor(private emailReportService: ReportService, private reportUtils: ReportUtilsService, private datePipe: DatePipe) {}


  private formatDate(date: any): string {
    if (!date) return 'NAN'; // ✅ Return empty string instead of null
  
    const parsedDate = new Date(date);
    console.log("parsedDate"+parsedDate);
    if (isNaN(parsedDate.getTime())) return 'NAN'; // ✅ Return empty string if invalid date
    return parsedDate.toISOString().split('T')[0]; // Extract YYYY-MM-DD part
  }


  ngDoCheck(): void {
    const newRecordCount = this.reports.length;
    if (newRecordCount !== this.records) {
      this.records = newRecordCount;
      console.log("The Records are " + this.records);
    }
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {  
    const start = this.dateStart?.value;
    const end = this.dateEnd?.value;
  
    if (!start || !end) {
      return null;  // Skip validation if either field is empty
    }
  
    // Check if start date is later than end date, or end date is earlier than start date
    if (new Date(start) > new Date(end)) {
      this.error = "StartDate must be befor EndDate"
      return { dateRangeInvalid: true }; // Error if dateStart is after dateEnd
    }
    else{
      this.error = "";
    }
    return null;
  }

  getReports(status: string){
    let allReports: any[] = [];
    let completedRequests = 0;
    this.report_generated = true;
    this.summary_generated = false;
    const formattedStartDate = this.formatDate(this.dateStart.value);
    const formattedEndDate = this.formatDate(this.dateEnd.value);
    if (status === ""){
      this.reports = [];
      status = `${this.statuses[0]} & ${this.statuses[3]}`
      this.emailReportService.fetchReports(status,formattedStartDate,formattedEndDate).subscribe({
        next: (response) => {
         this.reports = response.response.docs;
        },
        error: (err) => {
          console.error("API Error:", err);
          this.error = "Failed to fetch reports.";
        }
      });
      // this.statuses.forEach((status) => {
      //   this.emailReportService.fetchReports(status,formattedStartDate,formattedEndDate).subscribe({
      //     next: (response) => {
      //       allReports = allReports.concat(response.response.docs);
      //       completedRequests++;
  
      //       if (completedRequests === this.statuses.length) {
      //         this.reports = allReports;
      //         this.error = '';
      //       }
      //     },
      //     error: (err) => {
      //       console.error("API Error:", err);
      //       this.error = "Failed to fetch reports.";
      //     }
      //   });
      // });
    }
    else{
      this.reports = [];
      this.emailReportService.fetchReports(status,formattedStartDate,formattedEndDate).subscribe({
        next: (response) => {
         this.reports = response.response.docs;
        },
        error: (err) => {
          console.error("API Error:", err);
          this.error = "Failed to fetch reports.";
        }
      });
    }
  }

  download(){
    const zip = new JSZip();
    const currentDate: Date = new Date();
    const dateString: string = currentDate.toLocaleDateString();
    // Generate a CSV file for each sender
    const csvData = this.reportUtils.formateCSV(this.reports);
    zip.file(`${dateString.replaceAll("/","-")}${this.selectedStatus}.csv`, csvData);

    // Generate and trigger ZIP download
    zip.generateAsync({ type: "blob" }).then(content => {
      saveAs(content, "reports.zip");
    });
  }
  

  fetchReportSummary(status: string) {
    const formattedStartDate = this.formatDate(this.dateStart.value);
    const formattedEndDate = this.formatDate(this.dateEnd.value);
    this.emailReportService.fetchReports(status,formattedStartDate,formattedEndDate).subscribe({
      next: (response) => {
        this.reports = response.response.docs;
        this.groupReportsBySender(); // Group data after fetching
      },
      error: (err) => {
        console.error("API Error:", err);
        this.error = "Failed to fetch reports.";
      }
    });
  }

  fetchSummaryForEach() {
    let allReports: any[] = [];
    let completedRequests = 0;
    const formattedStartDate = this.formatDate(this.dateStart.value);
    const formattedEndDate = this.formatDate(this.dateEnd.value);

    let status = `${this.statuses[0]} & ${this.statuses[3]}`
    this.emailReportService.fetchReports(status,formattedStartDate,formattedEndDate).subscribe({
      next: (response) => {
       this.reports = response.response.docs;
       this.groupReportsBySender();
      },
      error: (err) => {
        console.error("API Error:", err);
        this.error = "Failed to fetch reports.";
      }
    });
    // this.statuses.forEach((status) => {
    //   this.emailReportService.fetchReports(status,formattedStartDate,formattedEndDate).subscribe({
    //     next: (response) => {
    //       allReports = allReports.concat(response.response.docs);
    //       completedRequests++;

    //       if (completedRequests === this.statuses.length) {
    //         this.reports = allReports;
    //         this.groupReportsBySender();
    //       }
    //     },
    //     error: (err) => {
    //       console.error("API Error:", err);
    //       this.error = "Failed to fetch reports.";
    //     }
    //   });
    // });
  }

  groupReportsBySender() {
    const groupedData = new Map();

    this.reports.forEach(report => {
        const sender = report.bml_hdr_sender;
        if (!groupedData.has(sender)) {
            groupedData.set(sender, {
                sender_address: sender,
                start_date: this.formatDate(report.bml_dispatchedat),
                end_date: this.formatDate(report.bml_sentat), // Might be null
                total_mail_received: 0,
                mail_ignored: 0,
                mail_skipped: 0,
                mail_sent: 0,
                mail_bounced: 0,
                mail_delivered: 0,
                mail_in_queue: 0,
                total_mail_sent_count: 0,
                total_mail_sent_size: 0,
            });
        }

        let groupedReport = groupedData.get(sender);

        // Update start_date only if it's earlier
        const reportDispatchDate = new Date(report.bml_dispatchedat);
        if (groupedReport.start_date) {
            const currentStartDate = new Date(groupedReport.start_date);
            if (reportDispatchDate < currentStartDate) {
                groupedReport.start_date = this.formatDate(report.bml_dispatchedat);
            }
        } else {
            groupedReport.start_date = this.formatDate(report.bml_dispatchedat);
        }

        // Update end_date only if it's later and not null
        if (report.bml_sentat) {
            const reportSentDate = new Date(report.bml_sentat);
            if (!groupedReport.end_date || reportSentDate > new Date(groupedReport.end_date)) {
                groupedReport.end_date = this.formatDate(report.bml_sentat);
            }
        }

        // Increment counts based on status
        groupedReport.total_mail_received += 1;
        groupedReport.mail_ignored += report.bml_status === "rejected" ? 1 : 0;
        groupedReport.mail_skipped += report.bml_status === "skipped" ? 1 : 0;
        groupedReport.mail_sent += report.bml_status === "sent" ? 1 : 0;
        groupedReport.mail_bounced += report.bml_status === "bounced" ? 1 : 0;
        groupedReport.mail_delivered += report.bml_status === "delivered" ? 1 : 0;
        groupedReport.mail_in_queue += report.bml_status === "queued" ? 1 : 0;
        groupedReport.total_mail_sent_count += 1;

        // Ensure `bml_msgsize` is a valid number
        const mailSize = parseFloat(report.bml_msgsize);
        groupedReport.total_mail_sent_size += isNaN(mailSize) ? 0 : mailSize;
    });

    this.groupedReports = Array.from(groupedData.values());
    console.log(this.groupedReports);
  }



  getTotal(column: string): string {
    return this.groupedReports
    .reduce((sum, report) => sum + (report[column] || 0), 0)
    .toFixed(2);
  }  
    
  generateSummary(status: string) {
    this.summary_generated = true;
    this.report_generated = false;
    if (status === "") {
      this.fetchSummaryForEach();
    } else {
      this.fetchReportSummary(status);
    }
  }


  @ViewChild('dateStartPicker') dateStartPicker!: BsDatepickerDirective;
  @ViewChild('dateEndPicker') dateEndPicker!: BsDatepickerDirective;

  showCalendar(picker: BsDatepickerDirective) {
    picker.toggle(); // ✅ Properly opens/closes datepicker
  }

  clearDate(control: FormControl) {
    control.setValue('');
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'bounced': return 'red';
      case 'dispatched': return 'blue';
      case 'rejected': return 'orange';
      case 'sent': return 'green';
      case 'skipped': return 'gray';
      default: return 'lightgray';
    }
  }

}

