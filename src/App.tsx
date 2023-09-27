

import { Login } from './pages/Login/Login.page';
import { LoginStore } from './pages/Login/Login.store';

import { Route, Router, Routes, createBrowserRouter, createRoutesFromElements, redirect } from 'react-router-dom';
import { Timers } from './pages/Timer/Timers.page';
import { IncomeBarsPage } from './pages/IncomeBars/IncomeBars.page';
import { LeftMenu } from './components/LeftMenu';
import { userStore } from './components/stores/user.store';
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { UserPage } from './pages/User/User.page';


import './index.css';
import { CalorieGraphPage } from './pages/CaloriesGraph/CaloriesGraph.page';
import { range } from './common/generator';

const storage = window.localStorage.setItem;


export const App = observer(() =>
{
  
  return (
    
    <div className={'helveticaNeueCyr flex'}>
      <div>
        <LeftMenu/>
      </div>
      

      <Routes>
        <Route path={'/'} element={<Login loginStore={new LoginStore()} userStore={userStore}/>}/>
        <Route path={'login'} element={<Login loginStore={new LoginStore()} userStore={userStore}/>}/>
        <Route path={'timers'} element={<Timers store={null}/>}/>
        <Route path={'income-bars'} element={<IncomeBarsPage a=''/>}/>          
        <Route path={'user'} element={<UserPage userStore={userStore}/>}/>          
        
        <Route path={'calories-graph'} element={<CalorieGraphPage/>}/>          
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


