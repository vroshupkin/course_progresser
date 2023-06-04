import { makeAutoObservable } from 'mobx';
import Cookies from 'universal-cookie';
import { post } from '../../api';


const cookie = new Cookies();

export class UserStore
{
  token = null as null | string;
  isVerifyToken = false;
  
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

  async getToken(body: {userName: string, password: string})
  {
    const response = await post('/auth/signIn', body);
    

    if(response.ok === true)
    {
      const result = await response.json();
      cookie.set('token', result.access_token);
      this.token = result.access_token;
    }
    else
    {
      const error = await response.json();
      
      return error as {login_error: string, password_error: string};
    }
    
  }

  async updateToken()
  {
    await fetch(process.env.REACT_APP_BACKEND_URL_DEV, { method: 'post' });
  }

}

export const userStore = new UserStore();