import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgxEchartsModule,  // Import NgxEchartsModule here
  ],
  providers: [],
  bootstrap: []
})
export class ReportModule { }
