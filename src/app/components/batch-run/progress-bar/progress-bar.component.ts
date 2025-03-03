import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {

  @Input() status: any;
  @Input() loopId!: string;
  @Input() refNode!: string;
  @Input() otherRun!: boolean;

  dispatched: number = 0;
  total: number = 0;
  msg: string = '';
  fileName ='Karanjeet.csv';
  startedby: string = '';
  errorMsg: string = '';
  errorLink: string = '';

  // ngOnInit(): void {
  //   this.calculateProgress();
  // }

  // calculateProgress(): void {
  //   this.dispatched = this.status.processed + this.status.error;
  //   this.total = this.status.processed + this.status.error + this.status.pending;

  //   this.fileName = `${this.status.configfile} / ${this.status.csvfile}`;
  //   this.startedby = `Started${this.otherRun ? ' by ' + this.status.username + ' from ' + this.status.ipaddress : ''} at ${this.status.rstarttime}.`;
  //   this.msg = `${this.dispatched} mails processed`;

  //   if (this.status.error && this.status.error > 0) {
  //     this.errorMsg = `Total ${this.status.error} error lines found.`;
  //     this.errorLink = ` Some or all of the messages may not have been transmitted. Check 
  //       <a href='/broadside/app/DownloadInputcsvError.action?appid=${this.status.appid}&conffilename=${this.status.conffilename}&inputfilename=${this.status.inputfilename}&inputfile_fqdnname=${this.status.csvfile}&starttime=${this.status.starttime}'>this file</a>.`;
  //   }

  //   if (this.status.processratemin) {
  //     this.msg += `, ${this.status.processratemin} mails/min`;
  //   }
  //   if (this.status.rendtime) {
  //     this.msg += this.status.percentcomplete === 100 ? `, finished at ${this.status.rendtime}` : `, will finish at ${this.status.rendtime}`;
  //   }
  // }
}