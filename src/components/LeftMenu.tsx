import { createUseStyles } from 'react-jss';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { FC, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaClock } from 'react-icons/fa';
import {  BsGraphUp } from 'react-icons/bs';

import { IconBaseProps, IconType } from 'react-icons/lib';
import { GiHamburgerMenu } from 'react-icons/gi';

type TRoute = '/user' | '/timers' | '/income-bars' | '/calories-graph'

interface IconAndLinkProps{
    link: TRoute
    description: string,
    icon: IconType,
    isSelect?: true,
    showDescription: boolean
}


const IconAndLink = (props: IconAndLinkProps) => 
{
  
  const classes = createUseStyles({

    iconAndLink: {
      display: 'flex',
      alignContent: 'center',
      cursor: 'pointer',

      '&:hover': {
        background: '#a0ffa0'
      },
      '& svg': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '30px',
        height: '30px',

      },
      '& a': {
        display: 'flex',
        alignItems: 'center',
        height: '35px',
        textDecoration: 'none',
        width: '100%',
      }
    },

    hideLinks: {
      '& span': {
        display: 'none'
      }
    },


  })();

  const Icon = iconFactory(props.icon);
    
    
  return(
    <div className={classes.iconAndLink}>
      <Link to={props.link} draggable={false}>
        <Icon/>
        {
          props.showDescription && <span>{props.description}</span>
        }
      </Link>
    </div>
  );
};


const iconFactory = (icon: IconType) => (props: IconBaseProps) => 
{
  return(
    <div className={'flex justify-center content-center'} >
      {icon(props)}
    </div>
  );
};
    

export const LeftMenu = () => 
{
  const [ showDescription, setShowDescrption ] = useState<boolean>(true);
   
  return (
    <div className={'flex flex-col mr-[5px] text-[18px]'}>
      <div className={'hover:bg-[#a0ffa0] h-[27px]'} onClick={() => setShowDescrption(!showDescription)}>
        <GiHamburgerMenu className='cursor-pointer h-[30px] w-[30px]'/>
      </div>
      
      <div>
        <IconAndLink link='/user' description='Пользователь' icon={FaUser} showDescription={showDescription}/>
        <IconAndLink link='/timers' description='Таймеры' icon={FaClock} showDescription={showDescription}/>
        <IconAndLink link='/income-bars' description='Графики' icon={BsGraphUp} showDescription={showDescription}/>
        <IconAndLink link='/calories-graph' description='График калорий' icon={BsGraphUp} showDescription={showDescription}/>
        
      </div>
    </div>
  );
};

