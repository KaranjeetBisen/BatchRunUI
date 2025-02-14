import { Injectable } from '@angular/core';
import { EmailReportComponent } from './email-report/email-report.component';
import { ReportService } from './report.service';

@Injectable({
  providedIn: 'root'
})
export class ReportUtilsService {

  constructor(private emailReportService: ReportService) { }
  reports: any[] = [];
  statuses: string[] = ["bounced", "dispatched", "rejected", "sent", "skipped"];


  fetchReports(status: string){
    this.emailReportService.fetchReports(status).subscribe({
      next: (response) => {
        this.reports = response.response.docs;
      },
      error: (err) => {
        console.error('API error', err);
        // this.error = "Failed to fetch reports.";
      }
    })
    return this.reports;
  }

  forEachReport(){
    let allReports: any[] = [];
    let completedRequests = 0;
    
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
          // this.error = "Failed to fetch reports.";
        }
      });
    });
    return this.reports;
  }

  formateCSV(reports : any[]){
      const headers = ["bml_id", "bml_status", "bml_app","adt_ip", "bml_msgsize", "bml_envrcpt","bml_dispatchedat", "bml_sentat", "bml_hdr_sender", "_version_"];
      const rows = reports.map(report => 
        [
          report.bml_id,
          report.bml_status,
          report.bml_app,
          report.adt_ip,
          report.bml_msgsize,
          report.bml_envrcpt,
          report.bml_dispatchedat,
          report.bml_sentat,
          report.bml_hdr_sender,
          report._version_
        ].join(",")
      );
  
      return [headers.join(","), ...rows].join("\n");
  }

}
