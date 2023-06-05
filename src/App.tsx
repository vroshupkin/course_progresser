
import { load } from 'webfontloader';

import { useEffect } from 'react';
import { createUseStyles } from 'react-jss';

import { Login, LoginStore } from './pages/Login/Login.page';
import { Route, Router, Routes, createBrowserRouter, createRoutesFromElements, redirect } from 'react-router-dom';
import { Timers } from './pages/Timer/Timers.page';
import { IncomeBarsPage } from './pages/IncomeBars/IncomeBars.page';
import { LeftMenu, LeftMenuStore } from './components/LeftMenu';
import {  LINK } from './constants';
import { userStore } from './components/stores/user.store';
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { UserPage } from './pages/User/User.page';
import './index.css';

const storage = window.localStorage.setItem;

const leftMenuStore = new LeftMenuStore();


export const App = observer(() =>
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
      

      <Routes>
        <Route path={'/'} element={<Login store={new LoginStore()} userStore={userStore}/>}/>
        
        <Route path={'login'} element={<Login store={new LoginStore()} userStore={userStore}/>}/>
        <Route path={'timers'} element={<Timers store={null}/>}/>
        <Route path={'income-bars'} element={<IncomeBarsPage a=''/>}/>          

        <Route path={'user'} element={<UserPage userStore={userStore}/>}/>          
      </Routes>
          
      {/* <div>
        <Routes>
          <Route path={LINK.INCOME_BARS} element={<IncomeBarsPage a=''/>}/>
          <Route path={'/'} element={<Login store={new LoginStore()} userStore={userStore}/>}/>

          <Route path={LINK.TIMERS} element={<Timers store={null}/>}/>
        </Routes>  
      </div> */}
      
    </div>

  );
});

