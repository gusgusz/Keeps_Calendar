import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  weeks: (number | null)[][] = [];

  constructor() { }

  ngOnInit(): void {
    this.generateCalendar(2023, 9);
  }

  generateCalendar(year: number, month: number): void {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();

    let currentDate = 1;
    for (let i = 0; i < 6; i++) {
      const week: (number | null)[] = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay.getDay()) {
          week.push(null);
        } else if (currentDate <= totalDays) {
          week.push(currentDate);
          currentDate++;
        } else {
          week.push(null);
        }
      }
      this.weeks.push(week);
    }
  }

  getDayClass(day: number | null): string {
    if (!day) return 'empty';

    const dayOfWeek = new Date(2023, 9, day).getDay();
    switch (dayOfWeek) {
      case 0:
        return 'domingo';
      case 1:
        return 'segunda';
      case 2:
        return 'terca';
      case 3:
        return 'quarta';
      case 4:
        return 'quinta';
      case 5:
        return 'sexta';
      case 6:
        return 'sabado';
      default:
        return '';
    }
  }
}
