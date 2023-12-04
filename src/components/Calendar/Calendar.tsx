import { observer } from 'mobx-react-lite';
import {
  FC,
  useRef,
  useState
} from 'react';
import { range } from '../../common/generator';
import { CalendarStore } from './Calendar.store';

import { CalendarProps } from './Calendar.types';
import { get_start_day, isLeapYear } from '../../common/date_helper/date.helper';
import { integral } from '../../common/math/integral';

const getMonth = (order: number) => 
  [ 'Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь' ][order];


const DaySelector: FC<{store: CalendarStore}> = observer(({ store }) => 
{   


  const DayDiv: FC<{day: number}> = observer(({ day }) => 
  {
    const div_ref = useRef<HTMLDivElement>(null);

    const click = () => store.changeDay(day);
    
    return (
      <div ref={div_ref} onClick={click} 
        className={'h-[12px] w-[44px] flex items-center justify-center cursor-pointer hover:bg-[#fff]'}>
        <span>{day}</span>
      </div>
    );
  });

  const NotSelectableDay: FC<{day: number}> = observer(({ day }) =>
  {
    const ref_div = useRef<HTMLDivElement>(null);

    return (
      <div ref={ref_div} 
        className={'h-[12px] w-[44px] flex items-center justify-center cursor-pointer bg-[#9c9c9c] text-[white]'}>
        <span>{day}</span>
      </div>
    );
  });

  /**
   * @param props.start_day uint[1...31] первый день недели 
   * @param props.count_days_of_month uint[1...31] количество дней в данном месяце
   * @returns 
   */
  const LastWeek: FC<{start_day: number, count_days_of_month: number}> = ({ start_day, count_days_of_month }) => 
  {
    const days = 
    range(7)
      .map(v => v + start_day)
      .map(day => (day - 1) % count_days_of_month)
      .map(day => day += 1);

      
    return(
      <div className={'flex justify-center select-none'}>
        {days.map(v => v >= 1 && v <= 7? 
          <NotSelectableDay day={v} key={v}/>:
          <DayDiv day={v} key={v}/>
        )
        }
      </div>
    ); 
    
  };

  const FirstWeek: FC<{start_day: number, count_days_of_month: number}> = ({ start_day, count_days_of_month }) => 
  {

    const days = 
      range(7)
        .map(v => v + start_day)
        .map(day => (day - 1) % count_days_of_month)
        .map(day => day += 1);

    return(
      <div className={'flex justify-center select-none'}>
        {days.map(v => v <= 7?
          <DayDiv day={v} key={v}/>:
          <NotSelectableDay day={v} key={v}/>
        )}
        
      </div>
    ); 
  };

  const Week: FC<{start_day: number}> = ({ start_day }) => 
  {
    return(
      <div className={'flex justify-center select-none'}>
        {range(start_day, start_day + 7).map(v => <DayDiv day={v} key={v}/>)}
      </div>
    ); 
  };

  const Weeks = () => 
  {
    return (
      <>
        <Week start_day={7 - store.startDayWeekOfMonth + 1}/>
        <Week start_day={2 * 7 - store.startDayWeekOfMonth + 1}/>
        <Week start_day={3 * 7 - store.startDayWeekOfMonth + 1}/>
        {store.countOfDisplayWeeks == 6? <Week start_day={4 * 7 - store.startDayWeekOfMonth + 1}/>: <></>}
      </>
    );
  };

  return (
   
    <div>
      <FirstWeek start_day={store.firstDay} count_days_of_month={store.countDayOfPrevMonths}/>
      <Weeks/>
      <LastWeek start_day={(store.countOfDisplayWeeks - 1) * 7 - store.startDayWeekOfMonth + 1} count_days_of_month={store.countDayOfMonth}/>
    
    </div>
  );
});


const YearSelector: FC<{store: CalendarStore}> = observer(({ store }) => 
{
  // const calendar_classes = CalendarClasses();
  const div_ref = useRef<HTMLDivElement>(null);
    
  const [ startYear, setStartYear ] = useState(store.date.getFullYear() - 2);

  // const year_style = 'hover: bg-[#fff] ';
  
  const base_class = 'w-[66px] h-[20px] flex items-center justify-center cursor-pointer select-none';
  const YearDiv: FC<{year: number}> = observer(({ year }) => 
  { 
    const div_ref = useRef<HTMLDivElement>(null);     

    
    const class_name = year == store.date.getFullYear()
      ? 'bg-[#1A6400] text-[#fff] ' + base_class
      : 'bg-[#D9D9D9] hover:bg-[#fff] ' + base_class;
      
    return(
      <div ref={div_ref} onClick={() => store.changeYear(year)}
        className={class_name}
      >
        <span>{year}</span>
      </div>
    );
  });


  const YearDivPrevOrNext = observer(({ type }: {type : 'prev' | 'next'}) =>   
  {
    const div_ref = useRef<HTMLDivElement>(null);

    const getHandler = (type: 'prev' | 'next') => () =>
      type === 'next'? setStartYear(startYear + 5) : setStartYear(startYear - 5);

    return(
      <div ref={div_ref} onClick={getHandler(type)}
        className={'hover: bg-[#d9d9d9] cursor-pointer hover:bg-[#fff] ' + base_class}>
        <span>{type === 'next'? '>>' : '<<'}</span>
      </div>
    );
  });


  return (
    <div  ref={div_ref}
      className={'flex justify-center mb-[10px]'}>

      <YearDivPrevOrNext type='prev'/>

      {range(5)
        .map(v => <YearDiv year={startYear + v}/>)
      }

      <YearDivPrevOrNext type='next'/>
    </div>

  );
      
});


const MonthSelector: FC<{store: CalendarStore}> = observer(({ store }) => 
{
  
  return (
    <div className={' flex justify-center flex-wrap ml-[2%] mr-[2%] gap-[3px] mb-[10px]'}>
      {range(12).map(v => <MonthDiv month_order={v} calendar_store={store}/>)}
    </div>
  );
});


const MonthDiv: FC<{calendar_store: CalendarStore, month_order: number}> = observer(({ calendar_store, month_order }) => 
{
  const class_name_select = 'bg-[#1A6400] text-[#fff]';
  const class_name_bypass = 'bg-[#fff] hover:bg-[#adadad] hover:text-[#fff] cursor-pointer';


  const class_name = month_order === calendar_store.date.getMonth() ? 
    class_name_select : 
    class_name_bypass;
  

  return(
    <div className={class_name} onClick={() => calendar_store.changeMonth(month_order + 1)}>
      <span>{getMonth(month_order)}</span>
    </div>
  );
});

const DateDisplay: FC<{calendar_store: CalendarStore}> = observer(({ calendar_store }) => 
{ 
  

  const div_class = 'text-[14px] h-[19px] bg-[#1A6400] flex items-center justify-center select-none' + {};

  return(
    <div className={'text-[#fff] flex justify-around pt-[8px] mb-[6px]'}>
      <div className={div_class + ' w-[64px]'}>
        <span>{calendar_store.date.getDate()}</span>
      </div>
      <div className={div_class +' w-[79px]'}>
        <span>{calendar_store.date.getMonth() + 1} {getMonth(calendar_store.date.getMonth())}</span>
      </div>
      <div className={div_class + ' w-[64px]'}>
        <span>{calendar_store.date.getFullYear()} год</span>
      </div>
    </div>

  );
});


type TDaySelector = {
  year: number
  month: number,
  
}

const NewDaySelector = ({ month, year }: TDaySelector) => 
{
  const year_start_day = get_start_day(year);

  // const deltas_year = [0, 3, ]
  const month_number_days = [ 0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30 ];

  if(isLeapYear(year))
  {
    month_number_days[2]++;
  }
  

  const month_start = integral(month_number_days)
    .map(v => (v + year_start_day) % 7);
  
  console.log(month_start);
  
  // const [prev_month_days, curr_month_days, next_month_days] = [days[12 - 1 + month], days[month], days[month + 1 ]]

  const prev_month_days = month_start[(12 - 1 + month) % 12];
  const curr_month_days = month_start[month];
  
  
};

NewDaySelector({ month: 0, year: 2023 });

export const Calendar: FC<CalendarProps> = observer(
  ({ store, onChange, initDate }) => 
  {

    store = store === undefined? new CalendarStore(initDate): store;

    if(onChange != undefined)
    {
      onChange(store.date);
    }
    
    return (
      <div className={'w-[380px] h-[192px] bg-[#ebebeb]'} >

        <DateDisplay calendar_store={store}/>
        <YearSelector store={store}/>
        <MonthSelector store={store}/>
        {/* <DaySelector store={store}/> */}

      </div>
    );
  }
);
