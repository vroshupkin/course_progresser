import { makeAutoObservable } from 'mobx';
import Cookies from 'universal-cookie';
import { api } from '../../api';


const cookie = new Cookies();

export class UserStore
{
  token = null as null | string;
  // isVerifyToken = false;
  userName = '';

  constructor()
  {
    makeAutoObservable(this);      
  }
  
  async verifyToken()
  {
    const cookie_token = cookie.get('token'); 
    if(!cookie_token)
    {
      this.token = null;
      
      return null;
    }
    

    // TODO сделать дебоунс
    const response = await api.get('/users/check_user');

    if(response instanceof Response)
    {
      if(response.status === 401)
      {
        this.token = null;
      }
    }
    
    this.token = cookie_token;
    
    return this.token;
  }
  
  setToken(token: null | string)
  {
    this.token = token;
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
      cookie.set('token', result.access_token);
      this.token = result.access_token;

      this.userName = body.userName;
    }
    

    return response;
    
  }

  // TODO сделать refreshToken
  // async updateToken()
  // {
  //   await fetch(process.env.REACT_APP_BACKEND_URL_DEV, { method: 'post' });
  // }

}

export const userStore = new UserStore();