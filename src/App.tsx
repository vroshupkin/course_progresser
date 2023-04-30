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


const storage = window.localStorage.setItem;

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
    fonts: {
      '& span':{
        fontFamily: 'Anonymous Pro'
      }
    }
  })();
  
  return (
    <div className={classes.fonts}>
      <Routes>
        <Route path="/income-bars" element={<IncomeBarsPage a=''/>}/>
        <Route path="/login" element={<Login store={new LoginStore()} />}/>
        <Route path="/timers" element={<Timers store={null}/>}/>
      </Routes>
    </div>

  );
}
