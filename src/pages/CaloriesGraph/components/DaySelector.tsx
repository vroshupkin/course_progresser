import { useRef } from 'react';
import { DateHelper, WEEK, equailtyDay } from '../../../common/date_helper/date.helper';
import { range } from '../../../common/generator';
import { getOrderInSiblings } from '../../../common/dom_helper/getOrderInSiblings';
import { DayCell } from './DayCell';

type DaySelectorProps = {
  startDay: Date,
  selectDay: Date,
  numberDays: number,
  setStartDay: (date: Date) => void,
  setSelectDay: (date: Date) => void,
}


/**
 * Ячейка с числом даты
 */
export const DaySelector = (props: DaySelectorProps) => 
{
  const ref_div = useRef<HTMLDivElement>(null);

  const [ selectDate, setSelectDate ] = [ props.selectDay, props.setSelectDay ];
  const [ startDay, setStartDay ] = [ props.startDay, props.setStartDay ];


  const changeStartDate = (count: number) => () =>
    setStartDay(DateHelper.changeDays(startDay, count));

  return(
    <div className={'flex'} ref={ref_div}>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
        <Arrow type='<' onClick={changeStartDate(-1)}/>
        <OneWeek setActiveDate={setSelectDate} day_counts={props.numberDays} day_start={startDay} selectDate={selectDate}/>
        <Arrow type='>' onClick={changeStartDate(1)}/>
      </div>
    </div>
  );
};


type arrowProps = {
  type: '<' | '>',
  onClick: React.MouseEventHandler<HTMLDivElement>
}
const Arrow = ({ onClick, type }: arrowProps) => 
{
  return(
    <div className={
      'flex justify-center items-center w-[37px] h-[29px] cursor-pointer select-none ' + 
      'hover:border-[1px] hover:border-solid hover:border-c-blue'}
    onClick={onClick}>
      <span>{type}</span>
    </div>
  );
};


type OneWeekProps = 
{
  day_counts: number,
  day_start: Date,
  onClick?: React.MouseEventHandler<HTMLDivElement>,
  selectDate: Date,
  setActiveDate?: Function
}


export const OneWeek = (props: OneWeekProps) => 
{

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
    <div className='flex'>
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

