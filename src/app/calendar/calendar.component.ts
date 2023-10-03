import { Component, OnInit } from '@angular/core';
import { Reminder } from '../reminder';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  weeks: (number | null)[][] = [];
  currentYear: number = 0;
  currentMonth: number = 0;
  reminders: Reminder[][] = Array(32).fill(null).map(() => []);

  constructor() {}

  ngOnInit(): void {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  generateCalendar(year: number, month: number): void {
    this.weeks = [];
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

  
  addReminder(day: number | null): void {
    if (day !== null && this.reminders[day] !== null) {
      const reminderText = prompt('Enter reminder (max 30 chars):');
      if (reminderText) {
        const reminder: Reminder = {
          text: reminderText.substring(0, 30),
          color: prompt('Enter reminder color: (e.g., red, blue, green)') || 'blue',
        };
  
        if (this.reminders[day]) {
          this.reminders[day].push(reminder);
        }
      }
    }
  }



  editReminder(day: number | null, reminder: Reminder): void {
    if (day !== null && this.reminders[day] !== null) {
      const newText = prompt('Edit reminder:', reminder.text);
      if (newText) {
        reminder.text = newText.substring(0, 30);
      }
    }
  }

  deleteReminder(day: number | null, reminder: Reminder): void {
    if (day !== null && this.reminders[day] !== null) {
      const index = this.reminders[day]!.indexOf(reminder); // Non-null assertion operator (!)
      if (index !== -1) {
        this.reminders[day]!.splice(index, 1); // Non-null assertion operator (!)
      }
    }
  }

  getDayClass(day: number | null): string {
    if (!day) return 'empty';

    const dayOfWeek = new Date(this.currentYear, this.currentMonth, day).getDay();
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

  nextMonth(): void {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  prevMonth(): void {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generateCalendar(this.currentYear, this.currentMonth);
  }
}
