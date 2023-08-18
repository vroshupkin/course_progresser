import { useState } from 'react';
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


const IconAndLink = ({ link, description, icon, showDescription, isSelect }: IconAndLinkProps) => 
{

  const Icon = iconFactory(icon);
    

  return(
    <div className={'hover:bg-[#eee] cursor-pointer flex content-center'}>
      <Link className={'w-[100%] h-[35px] flex content-center '} to={link} draggable={false}>
        <Icon className={'w-[30px] h-[30px]'}/>
        {
          showDescription && <span>{description}</span>
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
      <div className={'h-[27px] hover:bg-[#eee]  cursor-pointer'} onClick={() => setShowDescrption(!showDescription)}>
        <GiHamburgerMenu className='w-[30px] h-[30px] '/>
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

