import { action, computed, makeObservable, observable } from 'mobx';
import { month_helper } from '../../common/date';

export class CalendarStore 
{
  @observable public date: Date;
    

  constructor(date?: Date) 
  {
    if(!date)
    {
      date = new Date(Date.now());
    }
    this.date = date;
    makeObservable(this);
  }

  @action
  changeDate(date: Date)
  {
    this.date = date;
  }

  @action
  changeYear(year: number)
  { 
    this.date = new Date(`${year}-${this.date.getMonth() + 1}-${this.date.getDate()}`);
  }

  @action
  changeMonth(month: number)
  { 
    this.date = new Date(`${this.date.getFullYear()}-${month}-${this.date.getDate()}`);
  }

  @action
  changeDay(day: number)
  { 
    this.date = new Date(`${this.date.getFullYear()}-${this.date.getMonth() + 1}-${day}`);
  }

  @computed
  get startDayOfMonth()
  {
    return month_helper.getStartWeekOfMonth(this.date);
  }


  @computed
  get countDayOfPrevMonths()
  {
    const prev_month = month_helper.getPrevMonth(this.date);

    return month_helper.getDays(prev_month);
  }

  @computed
  get countDayOfMonth()
  {
    return month_helper.getDays(this.date);
  }  

  @computed
  get firstDay()
  {
    const firstDayOfWeek = month_helper.getStartWeekOfMonth(this.date);
    const prevMonth = month_helper.getPrevMonth(this.date);
    const countDayOfPrevMonth = month_helper.getDays(prevMonth);

    
    return (countDayOfPrevMonth - firstDayOfWeek) % countDayOfPrevMonth + 1;
  }

  @computed
  get startDayWeekOfMonth()
  {
    return month_helper.getStartWeekOfMonth(this.date);
  }

  @computed
  get countOfDisplayWeeks()
  {
    
    const days_of_the_month = month_helper.getDays(this.date);
    const order_of_week_in_month = month_helper.getStartWeekOfMonth(this.date);

    return Math.ceil( (days_of_the_month + order_of_week_in_month) / 7);
  }
  @computed
  /** День от начала года */
  get orderDayOfMonth()
  {
    return month_helper.amountDayOfMonth(this.date); 
  }


}


