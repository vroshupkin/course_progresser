

const isLeapYear = (year: number | Date) => 
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

  getName(order: number, lang = 'ru')
  {
    if(lang == 'en')
    {
      return this.en[order];    
    }
    
    return this.ru[order];
  },

  // Возвращает колиество дней в месяце
  getDays(date: Date)
  {
    const order = date.getMonth();
    
    if(order == 2 && isLeapYear(date))
    {
      return 29;
    }

    return this.count_of_days[order];
  },


  getStartWeekOfMonth(date: Date)
  {
    const firstDay = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-01`);
  
    return firstDay.getDay() - 1;
  },

  getPrevMonth(date: Date)
  {
    const prev_month = (date.getMonth() - 1) % 11;
    
    return new Date(`${date.getFullYear()}-${prev_month + 1}-01`);
  }

      
};


// type TTimeUnit = 'ms' | 's' | 'min' | 'hour' | 'day';


// class TimeUnit
// {   
//   private value: number;
//   private type: TTimeUnit;
  
  
//   constructor(value: number, type: TTimeUnit = 's')
//   {
//     this.value = value;
//     this.type = type;
//   }
  

// }