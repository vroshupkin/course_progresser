import { FaClock, FaTable, FaUser } from 'react-icons/fa';
import { LeftMenuUi, TLeftMenuUiProps } from '../components/LeftMenuUi';
import { BsGraphUp } from 'react-icons/bs';
import { FC } from 'react';

export const LeftMenu: FC = () => 
{
  return(
    <LeftMenuUi elements={[
      {
        link: '/user',
        description: 'Пользователь',
        icon: FaUser,
        showDescription: true
      },
      {     
        link: '/timers',
        description: 'Таймеры',
        icon: FaClock,
        showDescription: true
      },
      {
        link: '/income-bars',
        description: 'График',
        icon: BsGraphUp,
        showDescription: true
      },
      {
        link: '/calories-graph',
        description: 'График калорий',
        icon: BsGraphUp,
        showDescription: true
      },
      {
        link: '/discogs',
        description: 'Таблица',
        icon: FaTable,
        showDescription: true
      },
    ] }/>

  );
};