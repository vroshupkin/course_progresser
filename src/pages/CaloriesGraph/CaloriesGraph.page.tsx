import { useState } from 'react';
import { caloriesData } from './Calories.data';
import { DaySelector } from './components/DaySelector';
import { CaloriesChart } from './components/CaloriesChart';
import { ShowSelectDay } from './components/CaloriesInfo';
import './CaloriesGraph.page.css';

export const CalorieGraphPage = () => 
{
  const [ startDay, setStartDay ] = useState(new Date());
  const [ selectDay, setSelectDay ] = useState(new Date());

  
  return(
    <div className='w-[100%] helveticaNeueCyr flex flex-col items-center mt-[30px]'>
      <CaloriesChart calories={caloriesData} maxHeight={222}  maxValue={3000} numberOfDays={14} startDay={startDay}/>
      <DaySelector startDay={startDay} setStartDay={setStartDay} selectDay={selectDay} setSelectDay={setSelectDay} numberDays={14}/>
      <ShowSelectDay selectDay={selectDay}/>
    </div>
  );
};

