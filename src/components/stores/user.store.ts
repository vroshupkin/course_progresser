import { makeAutoObservable, observable } from 'mobx';
import Cookies from 'universal-cookie';
import { api } from '../../api';

const ONE_HOUR = 60 * 60;

const cookie = new Cookies();

export class UserStore
{ 
  constructor()
  {
    makeAutoObservable(this, {
      token: false,
      userName: false
    });      
  }
  
  get token()
  {
    return cookie.get('token'); 
  }

  set token(token: string)
  {
    cookie.set('token', token, { maxAge: ONE_HOUR }); 
  }


  /**
   * Получает токен, записывает его в куки и меняет в текущем экземпляре
   */
  async receiveToken(body: {userName: string, password: string})
  {
    const response = await api.post('/auth/signIn', body);
    if(response instanceof Error)
    {
      return response;
    }


    if(response.ok === true)
    {
      const result = await response.json();
      cookie.set('token', result.access_token, { maxAge: ONE_HOUR });
      cookie.set('userName', body.userName, { maxAge: ONE_HOUR });
    }
    

    return response;
  }

  get userName()
  {
    return cookie.get('userName');
    
  }
  // TODO сделать refreshToken
  // async updateToken()
  // {
  //   await fetch(process.env.REACT_APP_BACKEND_URL_DEV, { method: 'post' });
  // }

}

export const userStore = new UserStore();