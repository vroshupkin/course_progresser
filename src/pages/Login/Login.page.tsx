
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { UserStore } from '../../components/stores/user.store';
import { LoginClasses, StyleLoginRedSpan, LoginLoadingStyle } from './Login.style';
import { Navigate } from 'react-router-dom';
import { LoadAnimation } from '../../components/Loading/Loading';
import { LoginStore } from './Login.store';


const RedSpan = (input: {children: string}) =>
{
  const styles = StyleLoginRedSpan();
  
  return (
    <div className={styles.container}>
      <span>{input.children}</span>
    </div>
  );
};


export const Login: FC<{loginStore: LoginStore, userStore: UserStore}> = observer(({ loginStore, userStore }) => 
{
  const classes = LoginClasses();
  const loading_style = LoginLoadingStyle();

  return(
    userStore.isVerifyToken? <Navigate to='/user'/> :
      <div className={classes.wrapper} >
        
        <div className={classes.container} >
          <div className={classes.text}>
            <span>Вход в систему</span>
          </div>

          {loginStore.isLoading?
            <LoadAnimation language='rus' className={loading_style.center}/>:
            <RedSpan>{loginStore.login_error}</RedSpan>
          }
          
          <input className={classes.input} onChange={loginStore.OnChangeLogin} placeholder='Login'/>

          {loginStore.isLoading?
            <LoadAnimation language='rus' className={loading_style.center}/>:
            <RedSpan>{loginStore.password_error}</RedSpan>
          }

          
          <input  className={classes.input} onChange={loginStore.OnChangePassword} placeholder='Password' type='password'/>
          <button className={classes.button} onClick={loginStore.ClickEnter}>Войти</button>
        </div>
      
      
      </div>
  );
});

export { LoginStore };

