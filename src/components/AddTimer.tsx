import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { createUseStyles } from 'react-jss';
import { TimerStore } from './Timer';
import { FC } from 'react';

export class AddTimerStore
{
    
  constructor()
  {
        
    makeAutoObservable(this);    
  }
}

export const TimeConverter: FC<{timers_store: AddTimerStore}> = observer(({ timers_store }) => 
{
  const styles = createUseStyles(
    {
      container: {
            
      }
        
    }
    
  )();
  
  
  return(
    <div className={styles.container}>

      
    </div>
    
  );
});

