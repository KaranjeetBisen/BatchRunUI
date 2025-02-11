import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private currentDate: Date = new Date();
  private selectedDate: Date | null = null;
  
  constructor() {}

  getCurrentMonth(): number {
    return this.currentDate.getMonth();
  }

  getCurrentYear(): number {
    return this.currentDate.getFullYear();
  }

  setSelectedDate(date: Date): void {
    this.selectedDate = date;
  }

  getSelectedDate(): Date | null {
    return this.selectedDate;
  }

  generateCalendar(month: number, year: number): Date[][] {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    let dateMatrix: Date[][] = [];
    let week: Date[] = [];
    let startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    for (let i = 0; i < 6; i++) {
      week = [];
      for (let j = 0; j < 7; j++) {
        week.push(new Date(startDate));
        startDate.setDate(startDate.getDate() + 1);
      }
      dateMatrix.push(week);
    }
    return dateMatrix;
  }
}
