import { createUseStyles } from 'react-jss';
import { LINK } from '../constants';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { FC, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaClock } from 'react-icons/fa';
import {  BsGraphUp } from 'react-icons/bs';

import { IconBaseProps, IconType } from 'react-icons/lib';
import { GiHamburgerMenu } from 'react-icons/gi';

interface ILeftMenuRow{
    link: (typeof LINK)[keyof typeof LINK],
    description: string,
    icon: IconType
}


const guestLinks: ILeftMenuRow[] = 
[
  { 
    link: LINK.USER,
    description: 'Пользователь',
    icon: FaUser
  }
];

const userLinks: ILeftMenuRow[] = 
[
  ...guestLinks,
  {
    link: LINK.TIMERS,
    description: 'Таймеры',
    icon: FaClock
  },
  {
    link: LINK.INCOME_BARS,
    description: 'Графики',
    icon: BsGraphUp
  }
];


const iconFactory = (icon: IconType) => (props: IconBaseProps) => 
{
  const classes = createUseStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      '& svg': {
        display: 'block'
      }
    }
  })();

  return(
    <div className={classes.container}>
      {icon(props)}
    </div>
  );
};
    
export class LeftMenuStore
{
  activeTabLink: ILeftMenuRow['link'] = LINK.USER;
    
  constructor()
  {
    makeAutoObservable(this);
  }

  setActiveTab(active_link: ILeftMenuRow['link'])
  {
    this.activeTabLink = active_link;
  }
}

export const LeftMenu: FC<{store: LeftMenuStore}> = observer(({ store }) => 
{

  const classes = createUseStyles({
    containter:{
      display: 'flex',
      flexDirection: 'column',
      '& *': {
        fontSize: '18px'
      },
      marginRight: '5px'

      
    },
    active: {
      background: 'lime',
    },
    
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

    hamburger_class: {
      cursor: 'pointer'
    }

  })();

  const IconAndLink = (obj: ILeftMenuRow) => 
  {
    const container = useRef<HTMLDivElement>(null);


    container.current?.classList.remove(classes.active);
    if(obj.link === store.activeTabLink)
    {
      container.current?.classList.add(classes.active);
    }
    
    const Icon = iconFactory(obj.icon);
    
    const clickToLink = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => 
    {
      store.setActiveTab(obj.link);
    };
    
    
    return(
      <div onClick={clickToLink} className={classes.iconAndLink} ref={container}>

        <Link to={obj.link} draggable={false}>
          <Icon/>
          <div>
            <span>{obj.description}</span>
          </div>
        </Link>

      </div>
      
    );
  };


  const containter = useRef<HTMLDivElement>(null);

  const HamburgerIcon = iconFactory(GiHamburgerMenu);
  const hamburgerOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => 
  {
    containter.current?.classList.contains(classes.hideLinks)?
      containter.current?.classList.remove(classes.hideLinks):
      containter.current?.classList.add(classes.hideLinks);
  };
  
  return (
    <div className={classes.containter} ref={containter}>
      <div className={classes.iconAndLink} onClick={hamburgerOnClick}>
        <HamburgerIcon  className={classes.hamburger_class}/>      
      </div>
      
      <div>
        {userLinks.map(row_obj => IconAndLink(row_obj))}
      </div>
    </div>
  );
});