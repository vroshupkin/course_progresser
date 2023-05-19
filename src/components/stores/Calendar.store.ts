import { action, computed, makeObservable, observable } from 'mobx';

export class CalendarStore 
{
  @observable public date: Date;
  
  constructor(date: Date) 
  {
    
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

}

const isLeapYear = (year: number) => 
{

  if(year % 100 === 0)
  {
    if(year % 400 == 0)
    {
      return true;
    }
    
    return false;
  }
    
  if(year % 4 == 0)
  {
    return true;
  }
  
  return false;

};
