import { makeAutoObservable } from 'mobx';
import Cookies from 'universal-cookie';
import { post } from '../../api';


const cookie = new Cookies();

export class UserStore
{
  token = null as null | string;
  isVerifyToken = false;
  // isLoading = false;

  constructor()
  {
    makeAutoObservable(this);      
  }


  verifyToken()
  {
    const cookie_token = cookie.get('token');
    
    if(!cookie_token)
    {
      this.isVerifyToken = false;
      
      return;
    }

    this.token = cookie.get('token');
    
    this.isVerifyToken = true;
    
    
  }

  /**
   * Получает токен, записывает его в куки и меняет в текущем экземпляре
   */
  async getToken(body: {userName: string, password: string})
  {
    const response = await post('/auth/signIn', body);
    if(response instanceof Error)
    {
      return response;
    }


    if(response.ok === true)
    {
      const result = await response.json();
      cookie.set('token', result.access_token);
      this.token = result.access_token;
    }
    

    return response;
    
  }

  async updateToken()
  {
    await fetch(process.env.REACT_APP_BACKEND_URL_DEV, { method: 'post' });
  }

}

export const userStore = new UserStore();