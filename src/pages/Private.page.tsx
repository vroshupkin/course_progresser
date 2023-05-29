import { observer } from 'mobx-react-lite';
import { userStore } from '../components/stores/user.store';
import { Navigate } from 'react-router-dom';
import { FC, ReactNode } from 'react';

export const PrivatePage: FC<{children: ReactNode}> = observer(({ children } ) => 
{

  return(
    userStore.token === null? 
      <Navigate to="/login"/>:
      <>{ children }</>
  );
});
