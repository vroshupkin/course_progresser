import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { CalcStore, TimeConverter } from '../../components/TimeConverter';
import { InputNameStore, Timer, TimerStore } from '../../components/Timer';
import { Navigate } from 'react-router-dom';
import { Calendar } from '../../components/Calendar/Calendar';
import { CalendarStore } from '../../components/Calendar/Calendar.store';
import { CenterPopup } from '../../components/CenterPopup/CenterPopup';
import { PrivatePage } from '../Private.page';


export const Timers: FC<{store: null}> = observer(({ store }) => 
{
  
  return(
    <PrivatePage>
      <div>
        <div style={{ display: 'flex' }}>
          
          <Timer
            
            type='timeout'
            store={new TimerStore(30)}
            input_store={new InputNameStore('Варка яиц')}
            input_all_time_store={new InputNameStore('')}
          />
            
          
          <Timer
            type='common'
            store={new TimerStore()}
            input_store={new InputNameStore('Hello яиц')}
            input_all_time_store={new InputNameStore('')}
          />


          <Timer
            type='common'
            store={new TimerStore()}
            input_store={new InputNameStore('Верстка компонента')}
            input_all_time_store={new InputNameStore('')}
          />

          <TimeConverter calc_store = {new CalcStore(120, 60)}/>
        </div>
      
      </div>

    </PrivatePage>
   
  );
});

const UnauthTimers = () => observer(() => 
{
  return(
    <Navigate to="/login" replace/>
  );
});