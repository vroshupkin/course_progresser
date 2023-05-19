
import { load } from 'webfontloader';

import { useEffect } from 'react';
import { createUseStyles } from 'react-jss';

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
