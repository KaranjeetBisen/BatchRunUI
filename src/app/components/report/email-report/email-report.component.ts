import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerDirective, BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-email-report',
  imports: [NgIf,ReactiveFormsModule, BsDatepickerModule],
  templateUrl: './email-report.component.html',
  styleUrl: './email-report.component.scss'
})
export class EmailReportComponent {
  error: string = "Error while getting attributes";

  dateStart = new FormControl('');
  dateEnd = new FormControl('');

  bsConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-dark-blue',  // Change theme (use 'theme-dark-blue', 'theme-red', etc.)
    showWeekNumbers: false,  // Hide week numbers
    adaptivePosition: true,  // Ensures correct positioning
    dateInputFormat: 'YYYY-MM-DD', // Customize date format
    minDate: new Date(2020, 0, 1),  // Set minimum selectable date
    maxDate: new Date(),  // Restrict to current date
    customTodayClass: '.custom-today' // Custom class for today’s date
  };


  @ViewChild('dateStartPicker') dateStartPicker!: BsDatepickerDirective;
  @ViewChild('dateEndPicker') dateEndPicker!: BsDatepickerDirective;

  showCalendar(picker: BsDatepickerDirective) {
    picker.toggle(); // ✅ Properly opens/closes datepicker
  }

  // showCalendar(id: string) {
  //   const input = document.querySelector(`#${id} input`);
  //   if (input) {
  //     (input as HTMLInputElement).focus(); // Opens the datepicker
  //   }
  // }

  clearDate(control: FormControl) {
    control.setValue('');
  }
}
