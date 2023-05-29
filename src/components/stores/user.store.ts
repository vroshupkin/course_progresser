import { makeAutoObservable } from 'mobx';


export class UserStore
{
  token = null as null | string;

  isValidatedToken = false;
  
  constructor()
  {
    makeAutoObservable(this);      
  }

  async getToken(body: {userName: string, password: string})
  {
    const url = process.env.REACT_APP_BACKEND_URL_DEV + '/auth/signIn';
    

    const result = await fetch(url, { method: 'post', body: JSON.stringify(body) });

    if(result.ok)
    {

      console.log(result);
      
    }
    

  }

  async updateToken()
  {
    await fetch(process.env.REACT_APP_BACKEND_URL_DEV, { method: 'post' });
  }

}

export const userStore = new UserStore();