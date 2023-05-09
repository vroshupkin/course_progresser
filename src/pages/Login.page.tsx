import { action, makeAutoObservable, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { FC, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { api, post } from '../api';
import { REACT_APP_BACKEND_URL_DEV } from '../constants';


export class UserStore
{
    @observable
      access_token = '';
    constructor()
    {

      this.RefreshToken();
      makeObservable(this);
    }
    
    @action
    async RefreshToken()
    {
      this.access_token = 'asd';


      fetch('');
    }
}

export class LoginStore
{
  login = '';
  password = '';

  login_error = '';
  password_error ='';
  

  constructor()
  {
    makeAutoObservable(this);
  }

  OnChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) =>
  { 
    this.default_error();
    this.login = e.target.value;
  };

  OnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
  {
    this.default_error();
    this.password = e.target.value;
  };

  private default_error()
  {
    this.login_error = '';
    this.password_error = '';
  }

  ClickEnter = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)  =>
  {
    this.default_error();
    
    const dto = 
    {
      'userName': this.login,
      'password': this.password
    };
    
    const res = await post('/auth/signin', dto) as {login_error?: string, password_error?: string};


    if(res.login_error) 
    {
      this.login_error = 'Неправильно задан логин'; 
    }
    
    if(res.password_error)
    {
      this.password_error = 'Неправильно задан пароль';
    }
    
  };
}

export const Login: FC<{store: LoginStore}> = observer(({ store }) => 
{


  const styles = createUseStyles({
    container:
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          gap: '5px',
          border: 'solid 1px',
          borderRadius: '7px',
          padding: '10px',
          background: '#d4d4d4',

        },
    text: 
    {
      display: 'flex',
      justifyContent: 'center',
      '& span': {
        fontSize: '20px',
        fontWeight: 'bold'
      }
      
    },

    button:
    {
      background: 'white',
      '&:hover': {
        background: '#dbdbdb',
        cursor: 'pointer'
      },
      height: '25px'
    },

    input:
    {
      height: '20px'
    },

    wrapper: 
    {
      display: 'flex',
      justifyContent: 'center'
    }

  })();

  const RedSpan = (input: {children: string}) =>
  {
    return (
      <span style={{ color: 'red' }}>{input.children}</span>
    );
  }; 
  
  return(
    <div className={styles.wrapper}>
        
      <div className={styles.container}>
        <div className={styles.text}>
          <span>Вход в систему</span>
        </div>

        <RedSpan>{store.login_error}</RedSpan>
        <input  className={styles.input} onChange={store.OnChangeLogin} placeholder='Login'/>

        <RedSpan>{store.password_error}</RedSpan>
        <input  className={styles.input} onChange={store.OnChangePassword} placeholder='Password' type='password'/>

        <button className={styles.button} onClick={store.ClickEnter}>Войти</button>
      </div>
        
    </div>
  );
});
