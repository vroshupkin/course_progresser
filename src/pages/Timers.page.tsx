import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { createUseStyles } from 'react-jss';
import { CalcStore, TimeConverter } from '../components/TimeConverter';
import { InputNameStore, Timer, TimerStore } from '../components/Timer';
import { Navigate } from 'react-router-dom';
import { Calendar } from '../components/Calendar';
import { CalendarStore } from '../components/stores/Calendar.store';


export const Timers: FC<{store: null}> = observer(({ store }) => 
{
  const styles = createUseStyles({
    container:
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center'
        }
  })();
  
  const calendar_store = new CalendarStore(new Date(Date.now()));

  return(
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

      <div>
        <Calendar store={calendar_store}/>

      </div>
    </div>
  );
});

const UnauthTimers = () => observer(() => 
{
  return(
    <Navigate to="/login" replace/>
  );
});

// export TimersPage = () => observer(() => {

// })


