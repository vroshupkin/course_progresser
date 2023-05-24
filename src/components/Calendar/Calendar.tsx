import { observer } from 'mobx-react-lite';
import CSS from 'csstype';
import {
  createRef,
  FC,
  useState,
  createContext,
  useRef
} from 'react';
import { createUseStyles } from 'react-jss';
import { CalendarStore } from './Calendar.store';
import { generate } from '../../common/generator';
import { Colors, CalendarSizes, CalendarStyles, CalendarMonth, CalendarDisplayDateClasses } from './Calendar.style';
import { CalendarClasses } from './Calendar.style';
import { add_class, class_selector, toggle_class } from '../../common/class_helper';

const getMonth = (order: number) => 
  [ 'Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь' ][order];


interface CalendarProps {
  store: CalendarStore;
}


const DaySelector: FC<{store: CalendarStore}> = observer(({ store }) => 
{   
  const calendar_classes = CalendarClasses();


  const DayDiv: FC<{day: number}> = observer(({ day }) => 
  {
    const div_ref = useRef<HTMLDivElement>(null);

    add_class(div_ref, calendar_classes.day_cell_div);
    toggle_class(div_ref, calendar_classes.day_select, day == store.date.getDate());
   
    const click = () => store.changeDay(day);
    
    return (
      <div ref={div_ref} onClick={click}>
        <span>{day}</span>
      </div>
    );
  });

  const NotSelectableDay: FC<{day: number}> = observer(({ day }) =>
  {
    const ref_div = useRef<HTMLDivElement>(null);

    add_class(ref_div, calendar_classes.day_cell_div);
    add_class(ref_div, calendar_classes.day_not_selectable);

    return (
      <div ref={ref_div}>
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
    const days = [ 
      start_day,
      start_day + 1,
      start_day + 2,
      start_day + 3,
      start_day + 4,
      start_day + 5,
      start_day + 6,
    ]
      .map(day => (day - 1) % count_days_of_month)
      .map(day => day += 1);

    return(
      <div className={calendar_classes.flex_element_row}>
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
    const days = [ 
      start_day,
      start_day + 1,
      start_day + 2,
      start_day + 3,
      start_day + 4,
      start_day + 5,
      start_day + 6,
    ]
      .map(day => (day - 1) % count_days_of_month)
      .map(day => day += 1);

    return(
      <div className={calendar_classes.flex_element_row}>
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
      <div className={calendar_classes.flex_element_row}>
        {generate(start_day, start_day + 7).map(v => <DayDiv day={v} key={v}/>)}
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

export const Calendar: FC<CalendarProps> = observer(
  ({ store }) => 
  {

    const calendar_classes = CalendarClasses();

    return (
      <div className={calendar_classes.main_container}>

        <DateDisplay calendar_store={store}/>
        <YearSelector store={store}/>
        <MonthSelector store={store}/>
        <DaySelector store={store}/>

      </div>
    );
  }
);

const YearSelector: FC<{store: CalendarStore}> = observer(({ store }) => 
{
  const calendar_classes = CalendarClasses();
  const div_ref = useRef<HTMLDivElement>(null);
  
    
  const [ startYear, setStartYear ] = useState(store.date.getFullYear() - 2);

  const YearDiv: FC<{year: number}> = observer(({ year }) => 
  { 
    const div_ref = useRef<HTMLDivElement>(null);     

    class_selector(div_ref, calendar_classes.year_select, calendar_classes.year_bypass, year == store.date.getFullYear());

    return(
      <div ref={div_ref} onClick={() => store.changeYear(year)}>
        <span>{year}</span>
      </div>
    );
  });

    
  const YearDivNext = observer(() =>   
  {
    const div_ref = useRef<HTMLDivElement>(null);
    add_class(div_ref, calendar_classes.year_next_or_previous);

    return(
      <div ref={div_ref} onClick={() => setStartYear(startYear + 5)}>
        <span>{'>>'}</span>
      </div>
    );
  });
    
  const YearDivPrevious = observer(() =>   
  {
    const div_ref = useRef<HTMLDivElement>(null);
    add_class(div_ref, calendar_classes.year_next_or_previous);

    return(
      <div ref={div_ref} onClick={() => setStartYear(startYear - 5)}>
        <span>{'<<'}</span>
      </div>
    );
  });


  return (
    <div className={calendar_classes.year} ref={div_ref}>
      <YearDivPrevious/>

      <YearDiv year={startYear + 0}/>
      <YearDiv year={startYear + 1}/>
      <YearDiv year={startYear + 2}/>
      <YearDiv year={startYear + 3}/>
      <YearDiv year={startYear + 4}/>
          
      <YearDivNext/>
    </div>

  );
      
});


const MonthSelector: FC<{store: CalendarStore}> = observer(({ store }) => 
{
  const month_classes = CalendarMonth();

  return (
    <div className={month_classes.month}>
      <MonthDiv month_order={0}  calendar_store={store}/>
      <MonthDiv month_order={1}  calendar_store={store}/>
      <MonthDiv month_order={2}  calendar_store={store}/>
      <MonthDiv month_order={3}  calendar_store={store}/>
      <MonthDiv month_order={4}  calendar_store={store}/>
      <MonthDiv month_order={5}  calendar_store={store}/>
      <MonthDiv month_order={6}  calendar_store={store}/>
      <MonthDiv month_order={7}  calendar_store={store}/>
      <MonthDiv month_order={8}  calendar_store={store}/>
      <MonthDiv month_order={9}  calendar_store={store}/>
      <MonthDiv month_order={10} calendar_store={store}/>
      <MonthDiv month_order={11} calendar_store={store}/>
    </div>
  );
});


const MonthDiv: FC<{calendar_store: CalendarStore, month_order: number}> = observer(({ calendar_store, month_order }) => 
{
  const month_classes = CalendarMonth();

  const div_ref = useRef<HTMLDivElement>(null);
  class_selector(div_ref, month_classes.month_select, month_classes.month_bypass, month_order === calendar_store.date.getMonth());

  return(
    <div ref={div_ref} onClick={() => calendar_store.changeMonth(month_order + 1)}>
      <span>{getMonth(month_order)}</span>
    </div>
  );
});

const DateDisplay: FC<{calendar_store: CalendarStore}> = observer(({ calendar_store }) => 
{ 
  const div_ref = useRef<HTMLInputElement>(null);
  const classes = CalendarDisplayDateClasses();

  add_class(div_ref, classes.date);

  return(
    <div ref={div_ref}>
      <div>
        <span>{calendar_store.date.getDate()}</span>
      </div>
      <div>
        <span>{calendar_store.date.getMonth() + 1} {getMonth(calendar_store.date.getMonth())}</span>
      </div>
      <div>
        <span>{calendar_store.date.getFullYear()} год</span>
      </div>
    </div>

  );
});