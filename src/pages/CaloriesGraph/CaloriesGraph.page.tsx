import { observer } from 'mobx-react-lite';
import { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { TCaloriesData, caloriesData } from './Calories.data';
import { DateHelper, MONTH_NAME, WEEK, equailtyDay } from '../../common/date_helper/date.helper';
import { makeAutoObservable } from 'mobx';
import { range } from '../../common/generator';
import { applyStyle } from '../../common/css.helper';
import { Arrow } from './components/Arrow';
import { getOrderInSiblings } from '../../common/dom_helper/getOrderInSiblings';


export const CalorieGraphPage = () => 
{
  const [ startDay, setStartDay ] = useState(new Date());
  const [ selectDay, setSelectDay ] = useState(new Date());

  
  return(
    <div style={{ display: 'flex', flexDirection: 'column' }} className='helveticaNeueCyr'>
      <CaloriesChart calories={caloriesData} maxHeight={222}  maxValue={3000} numberOfDays={14} startDay={startDay}/>
      <DaySelector startDay={startDay} setStartDay={setStartDay} selectDay={selectDay} setSelectDay={setSelectDay} numberDays={14}/>
      <ShowSelectDay selectDay={selectDay}/>
    </div>
  );
};


/**
 * Ячейка с числом даты
 */
export const DaySelector: FC<DaySelectorProps> = observer((props) => 
{
  const classList = graphWeekSelector_class();
  const ref_div = useRef<HTMLDivElement>(null);

  const [ selectDate, setSelectDate ] = [ props.selectDay, props.setSelectDay ];
  const [ startDay, setStartDay ] = [ props.startDay, props.setStartDay ];


  const changeStartDate = (count: number) => () =>
    setStartDay(DateHelper.changeDays(startDay, count));

  return(
    <div className={classList.container} ref={ref_div}>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
        <Arrow type='<' onClick={changeStartDate(-1)}/>
        <OneWeek setActiveDate={setSelectDate} day_counts={props.numberDays} day_start={startDay} selectDate={selectDate}/>
        <Arrow type='>' onClick={changeStartDate(1)}/>
      </div>
    </div>
  );
}
);


const CaloriesChart = (props: CaloriesChartProps) => 
{
  const containerDivRef = useRef<null | HTMLDivElement>(null);
  
  useEffect(() => 
  {
    const style: CSSProperties = {
      height: '222px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'end'
    };

    if(containerDivRef.current)
    {
      applyStyle(containerDivRef.current, style);
    }
    
  }, []);

  const [ startDay, numberOfDays ] = [ props.startDay, props.numberOfDays ];

  
  const createCaloriesMap = () => 
  {
    const daysFilterFn = (date: Date): Boolean => 
    {
      const day_of_date = DateHelper.DateToDayOrder(date);
      const day_of_start_day = DateHelper.DateToDayOrder(startDay);
      const day_of_last_day = DateHelper.DateToDayOrder(DateHelper.changeDays(startDay, numberOfDays - 1));

      return(
        day_of_date >= day_of_start_day && 
        day_of_date <= day_of_last_day
      );
    };

    const calories_dict = {} as Record<number, number>;
    
    range(numberOfDays)
      .map(val => DateHelper.changeDays(startDay, val))
      .forEach(date => calories_dict[DateHelper.DateToDayOrder(date)] = 0);

    props.calories
      .filter(data => daysFilterFn(data.date))
      .forEach(data => 
      {
        const dayOrder = DateHelper.DateToDayOrder(data.date);
        if(calories_dict[dayOrder] == 0)
        {
          calories_dict[dayOrder] = data.val;
        }
      });


    return calories_dict;
        
  };
  
  return(
    <div ref={containerDivRef}>
      <div style={{ position: 'absolute' }}>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        
          <line x1="0" y1="80" x2="100" y2="20" stroke="black" />

        </svg>
      </div>
      
      <div style={{ width: `${CELL_WIDTH.val}px` }}/>
      {
        Object.entries(createCaloriesMap()).
          map(([ dayOrder, val ]) => 
          {
            const date = DateHelper.DayOrderToDate(Number(dayOrder));
              
            return(
              <>
                <CaloriesBar date={date} val={val} maxVal={props.maxValue} maxHeightPx={props.maxHeight}/>
                {date.getDay() === WEEK.Sunday && <div style={{ marginRight: '37px' }}></div>}
              </>
            );
          }
          )

      }
     
      
    </div>
    
  );
};


const graphWeekSelector_class = createUseStyles(
  {
    container: {
      display: 'flex',
    }
  }
);


const graphWeekSelectorCell = createUseStyles(
  {
    common_1: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',

      width: '37px',
      height: '27px',
      flexShrink: 0,

      border: '1px solid #C4C4C4',
      userSelect: 'none',
      '&:hover': {
        borderColor: '#21BEEF'
      },

    },

    left: {
      borderRadius: '5px 0px 0px 5px',
    },

    right: {
      borderRadius: '0px 5px 5px 0px',
      marginRight: '37px'
    },

    select: {
      background: '#21BEEF',
      color: 'white'
    },

    common: {

    }
      
  }
);


type GraphWeekSelectorCellProps = {
  type: 'left' | 'right' | 'common',
  children: string | number,
  select: boolean,
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

const DayCell: FC<GraphWeekSelectorCellProps> = observer((props) => 
{
  const classList = graphWeekSelectorCell();  
  const classDiv =  `${classList.common_1} ${classList[props.type]} ${props.select? classList.select : ''}`;

  return(
    <div className={classDiv} onClick={props.onClick}>
      <span>{props.children}</span>
    </div>
  );
}
);


enum CELL_WIDTH {
  val = 37
}


const ShowSelectDay = (props: {selectDay: Date}) => 
{
  const getDateString = (date: Date) => 
  {
    let month =  MONTH_NAME.ru.genetive[date.getMonth()];
    month = month[0].toUpperCase() + month.slice(1);
    
    return(
      `${date.getDate()} ${month} ${date.getFullYear()}`    
    );

  };
    
  return(
    <div className='flex flex-row text-[18px]'>
      <div className='font-[550] text-[#505359] mr-[140px]'>Сегодня</div>
      <div className='mr-[139px] text-[#838890]'>{getDateString(props.selectDay)}</div>
      <div className=' text-[18px] font-[550] text-[#505359] flex flex-row gap-[15px] cursor-pointer'>
        <div>Н</div>
        <div className='text-[#21BEEF]'>2Н</div>
        <div>М</div>
        <div>6М</div>
        <div>Г</div>
      </div>
    </div>
  );
      
};

type CaloriesChartProps = {
  calories: TCaloriesData[],
  maxHeight: number,
  maxValue: number,
  startDay: Date,
  numberOfDays: number
}


class DaySelectorStore
{
  // 1ый день на графике
  firstDay = new Date();
  selectedDay = new Date;

  constructor()
  {
    makeAutoObservable(this);
  }

  setSelectDay(date: Date)
  {
    this.selectedDay = date;
  }

  setFirstDay(date: Date)
  {
    this.firstDay = date;
  }
}


const daySelectorStore =  new DaySelectorStore();


type DaySelectorProps = {
  startDay: Date,
  selectDay: Date,
  numberDays: number,
  setStartDay: (date: Date) => void,
  setSelectDay: (date: Date) => void,
}

type OneWeekProps = 
{
  day_counts: number,
  day_start: Date,
  onClick?: React.MouseEventHandler<HTMLDivElement>,
  selectDate: Date,
  setActiveDate?: Function
}


type CaloriesBarProps = 
{
  date: Date,
  val: number,
  maxVal: number,
  maxHeightPx: number
} 


const CaloriesBar = (props: CaloriesBarProps) => 
{
  
  const divRef = useRef<HTMLDivElement | null>(null);
  // const divContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => 
  {
    if(divRef.current)
    {
      const style: CSSProperties = {
        backgroundColor: '#21BEEF',
        borderRadius: '5px 5px 0px 0px',
        marginBottom: '10px'
      };

      applyStyle(divRef.current, style);

    }
  }, []);

  useEffect(() => 
  {
    if(divRef.current)
    {
      const height = props.maxHeightPx * props.val / props.maxVal;
      divRef.current.style.height = height + 'px';
    }


  }, [ props.maxHeightPx, props.maxVal, props.val ]);

  
  return(
    <div className={'flex justify-center'} style={{ width: `${CELL_WIDTH.val}px` }}>
      <div className={'w-[10px]'} ref={divRef}></div>
    </div>
  );
};

const OneWeek = (props: OneWeekProps) => 
{
  const classList = graphWeekSelector_class();

  const days = 
    range(props.day_counts)
      .map(v => DateHelper.changeDays(props.day_start, v));

  const changeSelectedDate = (e: React.MouseEvent) => 
  {
    if(e.currentTarget && props.setActiveDate)
    {
      const order = getOrderInSiblings(e.currentTarget as HTMLElement);
      props.setActiveDate(days[order]);
    }
      
  };

  return(
    <div className={classList.container}>
      {
        days
          .map((d, i) => 
            <div style={{ display: 'flex', flexDirection: 'column' }} onClick={changeSelectedDate}>
              <DayCell 
                type={d.getDay() === WEEK.Monday? 'left' : d.getDay() === WEEK.Sunday ? 'right' : 'common'}
                children={d.getDate()}
                select={ equailtyDay(d, props.selectDate) }
              />
            </div>
          )
      }

    </div>
  );
};
