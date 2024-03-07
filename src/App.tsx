

import { Login } from './pages/Login/Login.page';
import { LoginStore } from './pages/Login/Login.store';

import { observer } from 'mobx-react-lite';
import { Route, Routes } from 'react-router-dom';
import { userStore } from './components/stores/user.store';
import { IncomeBarsPage } from './pages/IncomeBars/IncomeBars.page';
import { Timers } from './pages/Timer/Timers.page';
import { UserPage } from './pages/User/User.page';


import './index.css';
import { CalorieGraphPage } from './pages/CaloriesGraph/CaloriesGraph.page';
import { DiscogsPage } from './pages/Discogs/Discogs.page';
import { LeftMenu } from './widgets/LeftMenu';


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

        <Route path={'discogs'} element={<DiscogsPage/>}></Route>    
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


