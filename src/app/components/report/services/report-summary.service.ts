import { Injectable } from '@angular/core';
import { ReportService } from './report.service';

@Injectable({
  providedIn: 'root'
})
export class ReportSummaryService {
  
  groupedReports: any[] = [];
  reports: any[] = [];
  statuses: string[] = ["bounced", "dispatched", "rejected", "sent", "skipped"];

  constructor(private emailReportService: ReportService) { }

  fetchReportSummary(status: string) {
    this.emailReportService.fetchReports(status).subscribe({
      next: (response) => {
        this.reports = response.response.docs;
        this.groupReportsBySender(); // Group data after fetching
      },
      error: (err) => {
        console.error("API Error:", err);
        // this.error = "Failed to fetch reports.";
      }
    });
    return this.reports;
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
          // this.error = "Failed to fetch reports.";
        }
      });
    });
    return this.reports;
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
      groupedReport.mail_ignored += report.bml_status === "ignored" ? 1 : 0;
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


}
