import { integral } from './math/integral';


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
    if(lang == 'en')
    {
      return this.en[order];    
    }
    
    return this.ru[order];
  },

  /**
   * Return the numbers days in month
   * @param date - Day in current month
   * @returns  - uint[1...31] Return count of days in month 
   */
  getDays(date: Date)
  {
    const order = date.getMonth();
    
    if(order == 2 && isLeapYear(date))
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
    
    if(isLeapYear(date))
    {
      days += 1;
    }
    
    return days;
  }

      
};


export const sum_of_day_of_month = integral(
  [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]
);


/** 
 * Переводит дату на value вперед у экземпляра класса 
 * immutablecp[yq]
 */ 
export const changeDays = (date: Date, value: number) => 
{ 
  date = copyDate(date);
  date.setDate(date.getDate() + value); 
  
  return date;
};

/**
 * Copy date instance
 */
export const copyDate = (date: Date) => new Date(date.getTime());

/**
 * Это один день?
 */
export const equailtyDay = (d_1: Date, d_2: Date) =>   
  d_1.getFullYear() === d_2.getFullYear() &&
  d_1.getMonth() === d_2.getMonth() &&
  d_1.getDate() === d_2.getDate();

  