import { CSSProperties, FC, MutableRefObject, Ref, useEffect, useRef, useState } from 'react';
import { DateHelper, MONTH_NAME, WEEK } from '../../../common/date_helper/date.helper';
import { applyStyle } from '../../../common/css.helper';
import { TCaloriesData } from '../Calories.data';
import { range } from '../../../common/generator';
import { HoverPopUpProps, useHoverPopUp } from '../../../hooks/useHoverPopUp';

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
    <div ref={containerDivRef} className='relative'>
      <div className='absolute pointer-events-none flex w-full'>
        <svg className=' w-[500px]' xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="80" x2="100" y2="80" stroke="black" />
        </svg>
      </div>
      

      {
        Object.entries(createCaloriesMap()).
          map(([ dayOrder, val ]) => 
          {
            const date = DateHelper.DayOrderToDate(Number(dayOrder));
              
            return(
              <>
                <CaloriesBar val={val} maxVal={maxValue} maxHeightPx={maxHeight}/>
                {/* TODO сделать логику зависимой только от пере */}
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
  val: number,
  maxVal: number,
  maxHeightPx: number
} 


const CaloriesBar = ({ maxHeightPx, maxVal, val }: CaloriesBarProps) => 
{
  const barRef = useRef<HTMLDivElement | null>(null);

  const { hide, pos } = useHoverPopUp(barRef);

  const height_in_px = maxHeightPx * val / maxVal;

  return(
    <div 
      className={'flex justify-center relative'}
      style={{ width: `${CELL_WIDTH.val}px` }}
    >
      <div 
        className={'w-[10px] bg-c-blue rounded-t-[5px] mb-[10]'}
        ref={barRef}
        style={{ height: height_in_px }}
      />

      <HoverShowVal val={val} hide={hide} pos={pos} />
    </div>
  );
};


interface HoverShowValProps extends HoverPopUpProps{
    val: number
}

const HoverShowVal: FC<HoverShowValProps> = ({ val, hide, pos }) => 
{  
  return(
    <>
      {!hide && 
            <div
              className={'absolute select-none'}
              style={{ width: '50px', height: '50px', color: '#919191', top: pos[1] + 'px', left: pos[0] + 'px' }}
            >{val}</div>
      }
    </>
    
  );
};

