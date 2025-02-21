import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgxEchartsModule,
  ],
  providers: [DatePipe],
  bootstrap: []
})
export class ReportModule { }
