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
  useEffect(() => 
  {
    startDay.setMilliseconds(0);
    startDay.setSeconds(0);
    startDay.setMinutes(0);
    startDay.setHours(0);
  }, []);
  
  
  const createCaloriesMap = () => 
  {
    const calories_dict = {} as Record<number, number>;
    
    // fill calories dict 
    for (const day_offset of range(numberOfDays)) 
    {
      const date = DateHelper.offsetDay(startDay, day_offset);
      calories_dict[Number(date)] = 0;
    }

    calories
      .filter(data => data.date >= startDay && data.date < DateHelper.offsetDay(startDay, 14))
      .forEach(data => 
      {
        const date = DateHelper.toMidnight(data.date);
        
        if(calories_dict[Number(date)] == 0)
        {
          calories_dict[Number(date)] = data.val;
        }
      });

    return calories_dict;
        
  };
  
  
  return(
    <div className='relative h-[222px] flex items-end flex-row'>
      <div className='w-full h-full absolute pointer-events-none flex '>
        <svg className='w-full h-full' xmlns="http://www.w3.org/2000/svg">
          
          <text className='text-[12px] z-50 text-c-blue' x='0%' y='6%'>2500</text>
          <text className='text-[12px] text-c-blue' x='0%' y={25 + 6 + '%'}>1500</text>
          <text className='text-[12px] text-c-blue' x='0%' y={50 + 6 + '%'}>1000</text>
          <text className='text-[12px] text-c-blue' x='0%' y={75 + 6 + '%'}>500</text>


          <line x1="0" x2="100%" y1="0%"  y2="0%" stroke="#979797" strokeWidth={2}/>
          <line x1="0" x2="100%" y1="25%"  y2="25%" stroke="#979797" strokeWidth={2}/>
          <line x1="0" x2="100%" y1="50%"  y2="50%" stroke="#979797" strokeWidth={2}/>
          <line x1="0" x2="100%" y1="75%"  y2="75%" stroke="#979797" strokeWidth={2}/>
          
        </svg>
      </div>
      

      <div className='w-[37px]'/>

      {
        
        Object.entries(createCaloriesMap()).
          map(([ ms, val ]) => 
          {
            const date = new Date(Number(ms));
            
            return(
              <>
                <CaloriesBar val={val} maxVal={maxValue} maxHeightPx={maxHeight}/>
                {date.getDay() === WEEK.Sunday && <div className='w-[37px]'/>}
              </>
            );
          }
          )
      }

      <div className='w-[37px]'/>
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
              className={'absolute select-none z-50'}
              style={{ width: '50px', height: '50px', color: '#919191', top: pos[1] + 'px', left: pos[0] + 'px' }}
            >{val}</div>
      }
    </>
    
  );
};

