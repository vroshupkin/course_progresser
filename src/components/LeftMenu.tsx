import { createUseStyles } from 'react-jss';
import { LINK } from '../constants';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Link } from 'react-router-dom';


interface ILinks{
    link: (typeof LINK)[keyof typeof LINK],
    description: string
}


const guestLinks: ILinks[] = 
[
  { 
    link: LINK.USER,
    description: 'Пользователь'
  }
];

const userLinks: ILinks[] = 
[
  ...guestLinks,
  {
    link: LINK.TIMERS,
    description: 'Таймеры'
  },
  {
    link: LINK.INCOME_BARS,
    description: 'Графики'
  }
];


export class LeftMenuStore
{
  activeTabLink: ILinks['link'] = LINK.USER;
    
  constructor()
  {
    makeAutoObservable(this);
  }

  setActiveTab(active_link: ILinks['link'])
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

      
    },
    active: {
      background: 'lime',

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

    },
    
    element: {
        
      '&:hover': {
        background: '#a0ffa0'
      },
      '& a': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '35px'
      }
    }

  })();

  const element = (obj: ILinks) => 
  {
    // const is_active_class = obj.link === store.activeTabLink? classes.active : '';
    // const element_class =  classes.element + ' ' +  is_active_class;
    
    const element_class = obj.link === store.activeTabLink? classes.active : classes.element;
    
    return(
      <div className={element_class}>
        <Link
          to={obj.link}
          children={obj.description}
          onClick={() => store.setActiveTab(obj.link)}
        />
          
      </div>
    );
  };
  
  return (
    <div className={classes.containter}>
      <div>
        {userLinks.map(v => element(v))}
      </div>
    </div>
  );
});