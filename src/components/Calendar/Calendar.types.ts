import { CalendarStore } from './Calendar.store';

export interface CalendarProps {
  store?: CalendarStore;
  onChange?(date: Date): void;
  initDate?: Date
}
