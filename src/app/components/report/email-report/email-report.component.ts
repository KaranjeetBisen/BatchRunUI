import { NgFor, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerDirective, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ReportService } from '../report.service';
import JSZip from 'jszip'; 
import { saveAs } from 'file-saver';
import { ReportUtilsService } from '../report-utils.service';

@Component({
  selector: 'app-email-report',
  imports: [NgIf, NgFor,ReactiveFormsModule, BsDatepickerModule, FormsModule],
  templateUrl: './email-report.component.html',
  styleUrl: './email-report.component.scss'
})
export class EmailReportComponent {
  error: string = "";

  dateStart = new FormControl('');
  dateEnd = new FormControl('');
  reports: any[] = [];
  groupedReports: any[] = [];
  statuses: string[] = ["bounced", "dispatched", "rejected", "sent", "skipped"];
  selectedStatus: string = '';
  records: string = '';
  report_generated = false;
  summary_generated = false;
  options = [
    { value: 'adt_accno', text: 'adt_accno' },
    { value: 'adt_accno1', text: 'adt_accno1' },
    { value: 'adt_accno2', text: 'adt_accno2' },
    { value: 'adt_accno3', text: 'adt_accno3' },
    { value: 'adt_accno4', text: 'adt_accno4' }
  ];

  // validateDate(startDate){

  // }

  bsConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-dark-blue',  // Change theme (use 'theme-dark-blue', 'theme-red', etc.)
    showWeekNumbers: false,  // Hide week numbers
    adaptivePosition: true,  // Ensures correct positioning
    dateInputFormat: 'YYYY-MM-DD', // Customize date format
    minDate: new Date(2020, 0, 1),  // Set minimum selectable date
    maxDate: new Date(),  // Restrict to current date
    customTodayClass: 'custom-today' // Custom class for today’s date
  };

  constructor(private emailReportService: ReportService, private reportUtils: ReportUtilsService) {}

  getReports(status: string){
    let allReports: any[] = [];
    let completedRequests = 0;
    this.report_generated = true;
    this.summary_generated = false;
    if (status === ""){
      this.reports = [];
      this.statuses.forEach((status) => {
        this.emailReportService.fetchReports(status).subscribe({
          next: (response) => {
            allReports = allReports.concat(response.response.docs);
            completedRequests++;
  
            if (completedRequests === this.statuses.length) {
              this.reports = allReports;
            }
          },
          error: (err) => {
            console.error("API Error:", err);
            this.error = "Failed to fetch reports.";
          }
        });
      });
    }
    else{
      this.reports = [];
      this.reports = this.reportUtils.fetchReports(status);
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
    this.emailReportService.fetchReports(status).subscribe({
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

    this.statuses.forEach((status) => {
      this.emailReportService.fetchReports(status).subscribe({
        next: (response) => {
          allReports = allReports.concat(response.response.docs);
          completedRequests++;

          if (completedRequests === this.statuses.length) {
            this.reports = allReports;
            this.groupReportsBySender();
          }
        },
        error: (err) => {
          console.error("API Error:", err);
          this.error = "Failed to fetch reports.";
        }
      });
    });
  }

  groupReportsBySender() {
    const groupedData = new Map();

    this.reports.forEach(report => {
      const sender = report.bml_hdr_sender;
      if (!groupedData.has(sender)) {
        groupedData.set(sender, {
          sender_address: sender,
          start_date: report.bml_dispatchedat,
          end_date: report.bml_sentat,
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
      groupedReport.total_mail_received += 1;
      groupedReport.mail_ignored += report.bml_status === "rejected" ? 1 : 0;
      groupedReport.mail_skipped += report.bml_status === "skipped" ? 1 : 0;
      groupedReport.mail_sent += report.bml_status === "sent" ? 1 : 0;
      groupedReport.mail_bounced += report.bml_status === "bounced" ? 1 : 0;
      groupedReport.mail_delivered += report.bml_status === "delivered" ? 1 : 0;
      groupedReport.mail_in_queue += 1;
      groupedReport.total_mail_sent_count += 1;
      console.log(report.size_in_mb);
      groupedReport.total_mail_sent_size += parseFloat(report.bml_msgsize) || 0;
    });

    this.groupedReports = Array.from(groupedData.values());
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

