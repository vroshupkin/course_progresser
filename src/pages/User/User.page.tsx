/* eslint-disable @typescript-eslint/ban-ts-comment */
import { observer } from 'mobx-react-lite';
import { UserStore, userStore } from '../../components/stores/user.store';
import { ChangeEventHandler, FC, ReactNode, useEffect, useRef, useState } from 'react';
import { ComponentImageSelectorStyle, UserPageClasses, UserPageStyleTittle } from './User.style';
import { PrivatePage } from '../Private.page';

import user_default_png from './../../assets/user-default.png';
import { api } from '../../api';
import { load_avatar as load_avatar_img } from './User.controllers';
import { makeAutoObservable } from 'mobx';


const Tittle: FC<{children: string}> = ({ children }) => 
{
  const style = UserPageStyleTittle();

  return(
    <div className={style.container}>
      <span>{children}</span>
    </div>
  );

};


class ImageSelectorStore
{
  imageUrl = '';

  constructor()
  {
    makeAutoObservable(this);
    this.load_avatar();
  }

  async load_avatar()
  {
    const url = await load_avatar_img(userStore.userName);
    this.imageUrl = url === ''? user_default_png : url;
  }

  // Загружает аватар на сервер и загружает его с сервера
  async selectImage(file: File)
  {
    const formData = new FormData();
    formData.append('file', file);      
    formData.append('userName', userStore.userName);

    await api.upload_file('/users/upload-avatar', formData);
    this.imageUrl = await load_avatar_img(userStore.userName);
  }
}

const ImageSelector: FC<{children?: string, image_selector_store: ImageSelectorStore, containerClass: string}> = ({ children, image_selector_store, containerClass }) => 
{
  useEffect(() => 
  {
    image_selector_store.load_avatar();
  }, []);
  
  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => 
  {
    if(e.target.files)
    {
      image_selector_store.selectImage(e.target.files[0]);
    }  
  };
  
  return(
    <div  className={containerClass}>
      <span>Выберите файл</span>
      {/* BUG [low] Изменить ui. В текущей реализи инпут остается, просто становится прозрачным, и остается без курсора пальца */}
      <input type="file" accept="image/png, image/jpeg" onChange={selectFile} 
        style={{ opacity: '0.0', position: 'absolute', width: '100%', height: '100%', cursor: 'pointer' }}
      />
    </div>
    
  );
};


const image_selector_store = new ImageSelectorStore();

const AvatarImage: FC<{image_selector_store: ImageSelectorStore}> = observer(() => 
{
  {
    const styles = UserPageClasses();

    return(
      <div >
        <img className={styles.image} src={image_selector_store.imageUrl}/>
      </div>
    );

  }
});

export const UserPage: FC<{userStore: UserStore}> = observer(() => 
{

  const styles = UserPageClasses();
  
  const imageRef = useRef<HTMLImageElement>(null);

  const fullfied_url = async() => 
  {
    if(imageRef.current)
    {
      const res = await load_avatar_img(userStore.userName);
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
    load_avatar_img(userStore.userName).then(fullfied_url);
    
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
      await load_avatar_img(userStore.userName);
      await fullfied_url();
    }
    
  };
  
  return(
    <PrivatePage>
      {/* <div className={classes.container}> */}
      <div>
        <AvatarImage image_selector_store={image_selector_store}/>
        <ImageSelector image_selector_store={image_selector_store} containerClass={ComponentImageSelectorStyle().container}/>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          <div style={{ display: 'flex', gap: '30px' }}>
            <Tittle>Login</Tittle>
            <Tittle>{userStore.userName}</Tittle>
          </div>

          <div style={{ display: 'flex', gap: '30px' }}>
            <Tittle>Email</Tittle>
            <Tittle>TODO@email.com</Tittle>
          </div>

          <div style={{ display: 'flex', gap: '30px' }}>
            <Tittle>Telegram chat id</Tittle>
            <Tittle>Login</Tittle>
          </div>

        </div>
        

        <div>2</div>
        <div>3</div>
        <div>4</div>
            
      </div>
    </PrivatePage>
  );
});

