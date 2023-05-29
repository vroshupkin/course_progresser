import { action, makeAutoObservable, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { FC, RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { api, post } from '../../api';
import { REACT_APP_BACKEND_URL_DEV } from '../../constants';
import { CenterPopup } from '../../components/CenterPopup/CenterPopup';
import { CalendarStore } from '../../components/Calendar/Calendar.store';
import { Calendar } from '../../components/Calendar/Calendar';
import { UserStore, userStore } from '../../components/stores/user.store';
import { LoginCenterScreenStyle, LoginSizes } from './Login.style';


export class LoginStore
{
  login = '';
  password = '';

  login_error = ''; 
  password_error = '';
  

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
    
    const res = await post('/auth/signin', dto) as {login_error?: string, password_error?: string, access_token?: string};

    console.log(res);
    

    if(res.login_error) 
    {
      this.login_error = 'Неправильно задан логин'; 
    }
    
    if(res.password_error)
    {
      this.password_error = 'Неправильно задан пароль';
    }

    if(res.access_token)
    {
      userStore.token = res.access_token;
    }
  };
}


export const Login: FC<{store: LoginStore, userStore: UserStore}> = observer(({ store, userStore }) => 
{
  const classes = createUseStyles({
    container:
        {
          
          ...LoginSizes.container,
          ...LoginCenterScreenStyle,
          boxSizing: 'border-box',
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
  
  const calendar_store = new CalendarStore(new Date(Date.now()));
  const [ isDiplayCalendar, setIsDisplayCalendar ] = useState(false);


  const div_container_ref = useRef<HTMLDivElement>(null);

  useEffect(() => 
  {
    const layout_handler = () => 
    {
      if(div_container_ref === undefined)
      {
        return;
      }
      if(div_container_ref.current === undefined)
      {
        return;
      }

      const div = div_container_ref.current;
      if(div != undefined)
      {
        div.style.marginTop = -div.clientHeight / 0.8 + 'px';
        div.style.marginLeft = -div.clientWidth / 2 + 'px';
      }
        
      
    };

    layout_handler();
    
    window.addEventListener('resize', layout_handler );

    return () => 
    {
      window.removeEventListener('resize', layout_handler );
    };
  });

  
  return(
    <div className={classes.wrapper}>
        
      <div className={classes.container} ref={div_container_ref}>
        <div className={classes.text}>
          <span>Вход в систему</span>
        </div>

        <RedSpan>{store.login_error}</RedSpan>
        <input  className={classes.input} onChange={store.OnChangeLogin} placeholder='Login'/>

        <RedSpan>{store.password_error}</RedSpan>
        <input  className={classes.input} onChange={store.OnChangePassword} placeholder='Password' type='password'/>

        <button className={classes.button} onClick={store.ClickEnter}>Войти</button>
      </div>

      
      <div>
        <CenterPopup isDisplay={isDiplayCalendar}>
          <Calendar onChange={(date) => 
          {
            console.log(date);
          }}/>
        </CenterPopup>
        <button onClick={() => setIsDisplayCalendar(!isDiplayCalendar)}>Click me</button>
      </div>

      
    </div>
  );
});

