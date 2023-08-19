import { CSSProperties, useEffect, useRef } from 'react';
import { DateHelper, MONTH_NAME, WEEK } from '../../../common/date_helper/date.helper';
import { applyStyle } from '../../../common/css.helper';
import { TCaloriesData } from '../Calories.data';
import { range } from '../../../common/generator';

enum CELL_WIDTH {
  val = 37
}


export const CaloriesChart = ({ startDay, numberOfDays, calories, maxHeight, maxValue }: CaloriesChartProps) => 
{
  const containerDivRef = useRef<null | HTMLDivElement>(null);
  
  // TODO переписать под tailwind
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
  
  
  const createCaloriesMap = () => 
  {
    const daysFilterFn = (date: Date): Boolean => 
    {
      const day_of_select_day = DateHelper.DateToDayOrder(date);
      const day_of_start_day = DateHelper.DateToDayOrder(startDay);
      const day_of_last_day = DateHelper.DateToDayOrder(DateHelper.changeDays(startDay, numberOfDays - 1));

      return(
        day_of_select_day >= day_of_start_day && 
        day_of_select_day <= day_of_last_day
      );
    };

    const calories_dict = {} as Record<number, number>;
    
    range(numberOfDays)
      .map(val => DateHelper.changeDays(startDay, val))
      .forEach(date => calories_dict[DateHelper.DateToDayOrder(date)] = 0);

    calories
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
      
      <div/>
      {
        Object.entries(createCaloriesMap()).
          map(([ dayOrder, val ]) => 
          {
            const date = DateHelper.DayOrderToDate(Number(dayOrder));
              
            return(
              <>
                <CaloriesBar date={date} val={val} maxVal={maxValue} maxHeightPx={maxHeight}/>
                {date.getDay() === WEEK.Sunday && <div style={{ marginRight: '37px' }}></div>}
              </>
            );
          }
          )
      }
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


