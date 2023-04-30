import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { createUseStyles } from 'react-jss';
import { CalcStore, TimeConverter } from '../components/TimeConverter';
import { InputNameStore, Timer, TimerStore } from '../components/Timer';


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
  

  return(
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
  );
});
