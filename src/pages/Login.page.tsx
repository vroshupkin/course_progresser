import { action, makeAutoObservable, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
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

  constructor()
  {
    makeAutoObservable(this);
  }

  OnChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) =>
  {
    console.log(e.target.value);
    console.log(this.login);
    console.log(this);
    
    this.login = e.target.value;
  };

  OnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
  {
    this.password = e.target.value;
  };

  ClickEnter = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)  =>
  {
    
    
    // const access_token = await fetch(process.env.BACKEND_URL_DEV + '/auth/');
    
    // const dto = 
    // {
    //   userName: this.login,
    //   password: this.password
    // };

    const dto = 
    {
      'userName': 'admin',
      'password': 'admin admin'
    };
    // console.log(dto);
    
    // const res = await api.post(REACT_APP_BACKEND_URL_DEV + '/auth/signin', dto);
    const res = await post(REACT_APP_BACKEND_URL_DEV + '/auth/signin', dto);
    console.log(res);
    
    // await api.post(process.env.BACKEND_URL_DEV + '/auth/')
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
  

  return(
    <div className={styles.wrapper}>
        
      <div className={styles.container}>
        <div className={styles.text}>
          <span>Вход в систему</span>
        </div>
        <input  className={styles.input} onChange={store.OnChangeLogin} placeholder='Login'/>
        <input  className={styles.input} onChange={store.OnChangePassword} placeholder='Password' type='password'/>
        <button className={styles.button} onClick={store.ClickEnter}>Войти</button>
      </div>
        
    </div>
  );
});
