import { Dictionary } from './common/dictionary.interface.';
import { MobxComponent, MobxTimer } from './components/MobxTimer';
import { ProgressArray } from './components/ProgressBars';

import {
  ProgressBarStore,
  StoreManyProgressBar,
} from './components/stores/ProgressBar.store';
import { load } from 'webfontloader';
import { StepCard, VideoCard } from './components/StepCard';
import { ProcentStore } from './components/stores/ProcentStore.store';
import { course_10_name, step_10 } from './data/purpleSchoolNodeJS';
import CSS from 'csstype';
import {
  IncomeBar,
  IncomeBarControl,
  IncomeBars,
} from './components/IncomeBar';
import {
  IncomeBarStore,
  IncomeBarStores,
} from './components/stores/IncomeBar.store';
import { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { Table, TableStore } from './components/Table';
import { Example_1, StoreExample_1 } from './examples/Example_1';
import { InputNameStore, Timer, TimerStore, Timer_05_sec } from './components/Timer';
import { CalcStore, TimeConverter } from './components/TimeConverter';
import { Login, LoginStore } from './pages/Login.page';
import { Route, Router, Routes } from 'react-router-dom';
import { Timers } from './pages/Timers.page';
import { IncomeBarsPage } from './pages/IncomeBars.page';
import { LeftMenu, LeftMenuStore } from './components/LeftMenu';
import {  LINK } from './constants';


const storage = window.localStorage.setItem;

const leftMenuStore = new LeftMenuStore();

export default function App(): JSX.Element 
{

  useEffect(() => 
  {
    load({
      google: {
        families: [ 'Anonymous Pro' ],
      },
    });
  }, []);

  const classes = createUseStyles({
    container: {
      '& *':{
        fontFamily: 'Anonymous Pro',
        fontSize: '12px'
      },
      display: 'flex',
      
      
    },

  })();
  
  return (
    
    <div className={classes.container}>
      <div>
        <LeftMenu store={leftMenuStore}/>
      </div>
      
      <div>
        <Routes>
          <Route path={LINK.INCOME_BARS} element={<IncomeBarsPage a=''/>}/>
          <Route path={LINK.USER} element={<Login store={new LoginStore()} />}/>
          <Route path={LINK.TIMERS} element={<Timers store={null}/>}/>
        </Routes>  
      </div>
      
    </div>

  );
}
