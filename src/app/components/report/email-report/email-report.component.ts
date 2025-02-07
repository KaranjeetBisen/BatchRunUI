import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-email-report',
  imports: [NgIf],
  templateUrl: './email-report.component.html',
  styleUrl: './email-report.component.scss'
})
export class EmailReportComponent {
  error: string = "Error while getting attributes";
}
