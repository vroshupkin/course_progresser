import { observer } from 'mobx-react-lite';
import { userStore } from '../components/stores/user.store';
import { Navigate } from 'react-router-dom';
import { FC, ReactNode, useEffect } from 'react';
import Cookies from 'universal-cookie';

export const PrivatePage: FC<{children: ReactNode}> = observer(({ children } ) => 
{
  

  return(
    !userStore.token? 
      <Navigate to="/login"/>:
      <>{ children }</>
  );
});
