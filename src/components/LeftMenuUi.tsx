import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { configureStore, createSlice } from '@reduxjs/toolkit';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IconBaseProps, IconType } from 'react-icons/lib';
import { Provider, useDispatch, useSelector } from 'react-redux';

type TRoute = 
  '/user'           |
  '/timers'         |
  '/income-bars'    |
  '/calories-graph' |
  '/discogs'

interface IconAndLinkProps{
    link: TRoute
    description: string,
    icon: IconType,
    isSelect?: true,
    showDescription: boolean
}


const IconAndLink: FC<IconAndLinkProps> = ({ description, icon, link, showDescription }) => 
{
  const Icon = iconFactory(icon); 
  const dispatch: typeof linkStore.dispatch = useDispatch();
  
  // @ts-ignore
  const curr_link = useSelector((state) => '/' + state.link);
  
  return(
    <div 
      className={'flex content-center cursor-pointer hover:bg-[#a0ffa0] rounded-md whitespace-nowrap ' 
       + (link === curr_link? ' bg-[#56ce46]' : ' ')} 
      onClick={() => dispatch(CurrLinkSlice.actions.change_link())}>
      <Link to={link} draggable={false} className='flex flex-wrap flex-col justify-center h-[50px]'>
        <Icon className='w-[30px] h-[30px]'/>
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
    <div>
      {icon(props)}
    </div>
    
  );
};


const CurrLinkSlice = createSlice(
  {
    name: 'LeftMenu',
    initialState: {
      link: ''
    },
    reducers: {
      change_link(state) 
      {
        state.link = window.location.href.split('/')[3];
      }
    }
  }
);


export const linkStore = configureStore({
  reducer: CurrLinkSlice.reducer,
  preloadedState: CurrLinkSlice.getInitialState()
});


export type TLeftMenuUiProps = {elements: IconAndLinkProps[]}
export const LeftMenuUi: FC<TLeftMenuUiProps> = ({ elements }) => 
{
  const [ showDescription, setShowDescription ] = useState(true);
  
  return (
    <div className={'flex flex-col mr-[5px] text-[18px]'}>
      <div className={'hover:bg-[#a0ffa0] h-[27px]'} onClick={() => setShowDescription(!showDescription)}>
        <GiHamburgerMenu className='cursor-pointer h-[30px] w-[30px]'/>
      </div>
      
      <Provider store={linkStore}>
        <div>
          {elements.map(({ description, icon, link }) => 
            <IconAndLink 
              link={link}
              icon={icon}
              description={ description}
              showDescription={showDescription}
            />
          )}
        </div>
      </Provider>
    </div>
  );
};

