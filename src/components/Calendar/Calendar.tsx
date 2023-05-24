import { observer } from 'mobx-react-lite';
import CSS from 'csstype';
import {
  createRef,
  FC,
  useState,
  createContext
} from 'react';
import { createUseStyles } from 'react-jss';
import { CalendarStore } from './Calendar.store';
import { generate } from '../../common/generator';
import { Colors } from './Calendar.style';
import { CalendarClasses } from './Calendar.style';


const getMonth = (order: number) => 
  [ 'Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь' ][order];


interface CalendarProps {
  store: CalendarStore;
}

const text_center_style = 
{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

    
const SelectDayContext = createContext<number | null>(null);

const DaySelector: FC<{store: CalendarStore}> = observer(({ store }) => 
{   
  const classes = createUseStyles({

    day: {
        
      '& div': {
        display: 'flex',
        justifyContent: 'center',
        userSelect: 'none',
          
        '& div': {
          height: '12px',
          width: '44px',
          cursor: 'pointer',
          ...text_center_style,

          '&:hover': {
            background: 'white',
            color: 'black'
          }

        }
          
      }
    },

     
  })();

  const DayDiv: FC<{day: number}> = observer(({ day }) => 
  {
    const class_name = day == store.date.getDate()? CalendarClasses.day_select : '';
    const click = () => store.changeDay(day);
    
    return (
      <div className={class_name} onClick={click}>
        <span>{day}</span>
      </div>
    );
  });

  const NotSelectableDay: FC<{day: number}> = ({ day }) =>
  {
    return (
      <div className={CalendarClasses.day_not_selectable}>
        <span>{day}</span>
      </div>
    );
  };

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
      <div>
        {days.map(v => v >= 1 && v <= 7? 
          <NotSelectableDay day={v}/>:
          <DayDiv day={v}/>
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
      <div>
        {days.map(v => v <= 7?
          <DayDiv day={v}/>:
          <NotSelectableDay day={v}/>
        )}
        
      </div>
    ); 
  };

  const Week: FC<{start_day: number}> = ({ start_day }) => 
  {
    return(
      <div>
        {generate(start_day, start_day + 7).map(v => <DayDiv day={v}/>)}
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
   
    <div className={classes.day}>
      <FirstWeek start_day={store.firstDay} count_days_of_month={store.countDayOfPrevMonths}/>
      <Weeks/>
      <LastWeek start_day={(store.countOfDisplayWeeks - 1) * 7 - store.startDayWeekOfMonth + 1} count_days_of_month={store.countDayOfMonth}/>
    
    </div>
  );
});
export const Calendar: FC<CalendarProps> = observer(
  ({ store }) => 
  {


    const classes = createUseStyles({
      container:{
        width: '380px',
        height: '192px',
        background: '#EBEBEB'
      },

      date: {
        color: 'white',
        display: 'flex',
        justifyContent: 'space-around',
        paddingTop: '8px',
        marginBottom: '6px',
        '& div': {
          height: '19px',
          background: '#1A6400',
          ...text_center_style,
          userSelect: 'none',
          
        },
        '& div:nth-child(n + 1)': 
        {
          width: '64px'
        },
        '& div:nth-child(2)': 
        {
          width: '79px'
        },

        
      },

      year: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '10px',
        '& div': {
          width: '36px',
          height: '20px',
          ...text_center_style,
          cursor: 'pointer',
          userSelect: 'none',
          
        },
      },

      year_next_or_previous: {
        '&:hover': {
          background: 'white',
        }
      },

      year_bypass: {
        background: '#D9D9D9',
        '&:hover': {
          background: 'white',
        }
      },

      year_select: {
        background: '#1A6400',
        color: 'white',
        
      },

      now_year: {
        background: '#1A6400'
      },

      month: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginLeft: '2%',
        marginRight: '2%',
        gap: '3px',
        marginBottom: '10px',
        
        '& div': {
          height: '16px',
          width: '54px',
          cursor: 'pointer',
          userSelect: 'none',
          
          ...text_center_style,
        }
        
      },

      month_select: {
        background: '#1A6400',
        color: 'white',
      },

      month_bypass: {
        background: '#FFFFFF',
        '&:hover': {
          background: '#ADADAD',
          color: 'white',
        },
      },

      day: {
        
        '& div': {
          display: 'flex',
          justifyContent: 'center',
          userSelect: 'none',
          
          
          '& div': {
            height: '12px',
            width: '44px',
            cursor: 'pointer',
            ...text_center_style,

            '&:hover': {
              background: 'white',
              color: 'black'
            }

          }
          
        }
      },

      day_select:{
        background: '#1A6400',
        color: 'white'
      }
      
     
    })();

    const refs: { [s: string]: React.RefObject<HTMLDivElement> } = {
      year_ref: createRef<HTMLDivElement>(),
    };

    
    const [ startYear, setStartYear ] = useState(store.date.getFullYear() - 2);

    const YearDiv: FC<{year: number}> = ({ year }) => 
    {      
      const class_name = year == store.date.getFullYear()? classes.year_select : classes.year_bypass;

      return(
        <div className={class_name} onClick={() => store.changeYear(year)}>
          <span>{year}</span>
        </div>
      );
    };

    
    const YearDivNext = () =>   
      <div className={classes.year_next_or_previous} onClick={() => setStartYear(startYear + 5)}>
        <span>{'>>'}</span>
      </div>;
    
    const YearDivPrevious = () => 
      <div className={classes.year_next_or_previous} onClick={() => setStartYear(startYear - 5)}>
        <span>{'<<'}</span>
      </div>;

    const MonthDiv: FC<{month_order: number}> = ({ month_order }) => 
    {
      const class_name = month_order == store.date.getMonth()? classes.month_select : classes.month_bypass;
        
      return(
        <div className={class_name} onClick={() => store.changeMonth(month_order + 1)}>
          <span>{getMonth(month_order)}</span>
        </div>
      );
    };

    return (
      <SelectDayContext.Provider value={store.date.getDay()}>
        <div className={classes.container}>

          <div className={classes.date}>
            <div>
              <span>{store.date.getDate()}</span>
            </div>
            <div>
              <span>{store.date.getMonth() + 1} {getMonth(store.date.getMonth())}</span>
            </div>
            <div>
              <span>{store.date.getFullYear()} год</span>
            </div>
          </div>

          <div className={classes.year} ref={refs.year_ref}>
            <YearDivPrevious/>
            {generate(5).map(v => <YearDiv year={startYear + v}/>)}
            <YearDivNext/>
          </div>

          <div className={classes.month}>
            {generate(12).map(v => <MonthDiv month_order={v}/>)}
          </div>

          <DaySelector store={store}/>


        </div>
      </SelectDayContext.Provider>
    );
  }
);
