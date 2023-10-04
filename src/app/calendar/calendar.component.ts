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
  reminders: { [date: string]: Reminder[] } = {};


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
          const currentDate = j + i * 7 - firstDay.getDay() + 1;
          week.push(currentDate);
          const dateKey = this.getDateKey(currentDate);
          if (!this.reminders[dateKey]) {
            this.reminders[dateKey] = [];
          }
        } else {
          week.push(null);
        }
      }
      this.weeks.push(week);
    }
  }
  
  addReminder(day: number | null): void {
    if (day !== null) {
      const dateKey = this.getDateKey(day);
      if (!this.reminders[dateKey]) {
        this.reminders[dateKey] = [];
      }
  
      const reminderText = prompt('Enter reminder (max 30 chars):');
      if (reminderText) {
        const reminder: Reminder = {
          text: reminderText.substring(0, 30),
          color: prompt('Enter reminder color: (e.g., red, blue, green)') || 'blue',
        };
        this.reminders[dateKey].push(reminder);
      }
    }
  }
  
  editReminder(dateKey: string, reminder: Reminder): void {
    const newText = prompt('Edit reminder:', reminder.text);
    if (newText) {
      reminder.text = newText.substring(0, 30);
    }
  }
  
  deleteReminder(dateKey: string, reminder: Reminder): void {
    const index = this.reminders[dateKey].indexOf(reminder);
    if (index !== -1) {
      this.reminders[dateKey].splice(index, 1);
    }
  }
  
  public getDateKey(day: number): string {
    const yearMonth = `${this.currentYear}-${this.padZero(this.currentMonth + 1)}`;
    return `${yearMonth}-${this.padZero(day)}`;
  }
  
  
  private padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
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
