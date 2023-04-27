import * as Form from '@radix-ui/react-form';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { createUseStyles } from 'react-jss';
import { InputTime, TimerStore } from './Timer';
import { container_common_style, container_element_style } from '../styles/container.style';
import { computed, makeObservable, observable } from 'mobx';
import { SecondsTo_hh_mm_ss } from '../common/parsers';


export class CalcStore
{
    @observable
      terms_stores: [TimerStore, TimerStore];

    @computed
    get diffrence()
    {
      return this.terms_stores[1].AllTime - this.terms_stores[0].AllTime;
    }
      

    constructor(start_in_sec: number, end_in_second: number)
    {
      this.terms_stores = [ new TimerStore(end_in_second), new TimerStore(start_in_sec) ];
      makeObservable(this);

    }

    
}

export const TimeConverter: FC<{calc_store: CalcStore}> = observer(({ calc_store }) => 
{
  const styles = createUseStyles(
    {
      container: {
        width: '468px',
        height: '90px',
        ...container_common_style,
        flexDirection: 'column',
        gap: '5px',

        '& div': {
          marginLeft: '0px'
        }
        
        
      },
      operator: {
        height: '22px',
        width: '22px',
        ...container_element_style
      },

      result: {
        height: '31px',
        width: '100px',
        fontWeight: 'bold',
        ...container_element_style,

      },

      name: {
        height: '31px',
        width: '200px',
        fontWeight: 'bold',
        ...container_element_style,

      },

      row: {
        height: '234px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5px'
        
        
      }
    }
  )();
  
  const Operator: FC<{sign: string}> = ({ sign }) => 
  {
    
    return (
      <div className={styles.operator}>
        <span>{sign}</span>  
      </div>
    );
  };
  
  
  return(
    <div className={styles.container}>

      <div className={styles.row}>
        <div className={styles.name}>
          <span>Посчитать время</span>
        </div>
        
      </div>

      <div className={styles.row}>
        <InputTime store={calc_store.terms_stores[1]}/>
        <Operator sign="-"/>
        <InputTime store={calc_store.terms_stores[0]}/>
        <Operator sign="="/>
        <div className={styles.result}>
          <span>{SecondsTo_hh_mm_ss(calc_store.diffrence)}</span>
        </div>

      </div>
      
    </div>
    
  );
});

