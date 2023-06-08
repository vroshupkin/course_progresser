import { makeAutoObservable } from 'mobx';
import { userStore } from '../../components/stores/user.store';

export class LoginStore
{
  login = '';
  password = '';

  login_error = ''; 
  password_error = '';

  isLoading = false;
  
  // isVerifyToken = userStore.verifyToken;

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
      userName: this.login,
      password: this.password
    };
    
    this.isLoading = true;
    const response = await userStore.getToken(dto);
    if(response instanceof Error)
    {
      this.login_error = response.message;
      this.password_error = response.message;
    }
    else if(response instanceof Response)
    {
        
      if(response.status === 404)
      {
        this.login_error =  '404 Нет такой страницы',
        this.password_error =  '404 Нет такой страницы';
      }

      if(!response.ok)
      {
        const json = await response.json() as {login_error: string, password_error: string};

        this.login_error = json.login_error;
        this.password_error = json.password_error;
      }

      
    }

    this.isLoading = false;
    

    userStore.verifyToken();
    
    
  };


}
