import { integral } from './math/integral';


enum IN_MS{
  DAY = 1000 * 60 * 60 * 24  
}

export enum MONTH {
  January, February, March, April, May, June, July, August, September, October, November, December
}


export enum WEEK {
  Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
}

export const MONTH_NAME = {
  ru: {
    /** Именительный падеж */
    nominative: [ 'январь', 'февраль', 'март', 'апрель' , 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь' ],
    /** Родительный падеж */
    genetive: [ 'января', 'февраля', 'марта', 'апреля' , 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря' ]
  }
};

export const isLeapYear = (year: number | Date) => 
{
  if(year instanceof Date) 
  {
    year = year.getFullYear();
  }
  
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


export const month_helper = 
{
  ru: [ 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ],
  en: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
  count_of_days: [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ],
  

  /**
   * Берет месяц по порядку
   * @param order Порядок месяца начиная с 0
   * @param lang ru | en
   */
  getName(order: number, lang = 'ru')
  {

    return lang == 'en'?
      this.en[order] : this.ru[order];
    
  },

  /**
   * Return the numbers days in month
   * @param date - Day in current month
   * @returns  - uint[1...31] Return count of days in month 
   */
  getDays(date: Date)
  {
    const order = date.getMonth();
    
    if(order == MONTH.February && isLeapYear(date))
    {
      return 29;
    }

    return this.count_of_days[order];
  },

  
  /**
   * @returns - uint[0...6] Return day of week. Monday = 0, Sunday = 6
   */
  getStartWeekOfMonth(date: Date)
  {
    const firstDay = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-01`);
    if(firstDay.getDay() == 0)
    {
      return 6;
    }
    
    return firstDay.getDay() - 1;
  },

  /**
   * @param date Date with current month
   * @returns - uint[0...11] Return first day of previous month
   */
  getPrevMonth(date: Date)
  {
    const month = date.getMonth();
    let prev_month;
    if(month == 0)
    {
      prev_month = 11;
    }
    else
    {
      prev_month = month - 1;
    }
    
    return new Date(`${date.getFullYear()}-${prev_month + 1}-01`);
  },

  /**
   * @param date Current date
   * @returns uint[31...365] Сумма дней месяца, включая текущий месяц
   */
  amountDayOfMonth(date: Date)
  {
    let days = sum_of_day_of_month[date.getMonth()];
    {
      if(isLeapYear(date) && date.getMonth() >= MONTH.February)
      {
        days += 1;
      }
      
    }
    
    return days;
  },
  
  
};
/*
 * Возвращает порядок дня начиная с 1 января 1970 года
 */
export const DateHelper = {
  DateToDayOrder: (date: Date) => Math.floor(Number(date) / IN_MS.DAY),
  // 12
  DayOrderToDate: (dayOrder: number) => new Date(dayOrder * IN_MS.DAY + 1), 

  /** 
 * Переводит дату на value вперед у экземпляра класса 
 * immutable
 */ 
  changeDays: (date: Date, value: number) => 
  { 
    date = copyDate(date);
    date.setDate(date.getDate() + value); 
  
    return date;
  }
};

export const sum_of_day_of_month = integral(
  [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]
);


/**
 * Copy date instance
 */
export const copyDate = (date: Date) => new Date(date.getTime());

// TODO а нужно ли сводить всё к дням? Не проще ли взять какой это день по порядку от юникс тайма?
/**
 * Это один день?
 */

export const equailtyDay = (d1: Date, d2: Date) => 
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

export const greaterThan = (d1: Date, d2: Date) => 
{
  const functions = [
    Date.prototype.getFullYear,
    Date.prototype.getMonth,
    Date.prototype.getDate
  ];
  
  for (const fn of functions) 
  {
    const fn1 = fn.bind(d1);
    const fn2 = fn.bind(d2);
    const res = fn1() - fn2();
    if(res > 0)
    {
      return true;
    }
    if(res < 0)
    {
      return false;
    }
  }
  
  return false;
  
};


const lessThan = (d1: Date, d2: Date) => !greaterThan(d1, d2);
const lessOrEquality = (d1: Date, d2: Date) => lessThan(d1, d2) || equailtyDay(d1, d2);
const greaterOrEquality = (d1: Date, d2: Date) => greaterThan(d1, d2) || equailtyDay(d1, d2);


export const daysCompare = (d1: Date, operator: '==' | '>' | '<' | '>=' | '<=', d2: Date) =>
{
  const operation = {
    '>': greaterThan,
    '<': lessThan,
    '==': equailtyDay,
    '>=': greaterOrEquality,
    '<=': lessOrEquality
  };

  return operation[operator](d1, d2);

};


