/* eslint-disable @typescript-eslint/ban-ts-comment */
import { observer } from 'mobx-react-lite';
import { UserStore, userStore } from '../../components/stores/user.store';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { UserPageClasses, UserPageStyleTittle } from './User.style';
import { PrivatePage } from '../Private.page';

import user_default_png from './../../assets/user-default.png';
import { api } from '../../api';
import { get_avatar } from './User.controllers';


const Tittle: FC<{children: string}> = ({ children }) => 
{
  const style = UserPageStyleTittle();

  return(
    <div className={style.container}>
      <span>{children}</span>
    </div>
  );

};

export const UserPage: FC<{userStore: UserStore}> = observer(() => 
{

  const styles = UserPageClasses();

  const imageRef = useRef<HTMLImageElement>(null);

  const fullfied_url = async() => 
  {
    if(imageRef.current)
    {
      const res = await get_avatar(userStore.userName);
      if(typeof(res) === 'string')
      {
        imageRef.current.src = res;
      }
      else
      {
        imageRef.current.src = '';
      }
      
    }
  };

  useEffect(() => 
  {
    get_avatar(userStore.userName).then(fullfied_url);
    
  }, []);


  /**
   * Обработчик выбора файла
   */
  const async_handler_file_select = async(e: React.ChangeEvent<HTMLInputElement>) => 
  {
    const formData = new FormData();

    if(e.target.files)
    {
      formData.append('file', e.target.files[0]);      
      formData.append('userName', userStore.userName);

      await api.upload_file('/users/upload-avatar', formData);
      await get_avatar(userStore.userName);
      await fullfied_url();


    }
    
    
  };
  
  return(
    <PrivatePage>
      {/* <div className={classes.container}> */}
      <div >
        <div>
          <img className={styles.image} ref={imageRef} src={user_default_png}/>
        </div>

        <input type="file" accept="image/png, image/jpeg" onChange={async_handler_file_select}/>
        {/* {isValidFile && <button onClick={e => }>Загрузить автар</button>} */}
        
        <Tittle>Login</Tittle>
        <div>2</div>
        <div>3</div>
        <div>4</div>
            
      </div>
    </PrivatePage>
  );
});

