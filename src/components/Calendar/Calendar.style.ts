import { Styles, createUseStyles } from 'react-jss';

export const Colors = 
{
  green_1: '#1A6400',
    
};

export const CalendarSizes = 
{
  day_div: {
    height: '12px',
    width: '44px',
  },

  container: {
    width: '380px',
    height: '192px',
  },

  year_div: {
    width: '66px',
    height: '20px',
  }
};

export const CalendarClasses = createUseStyles({
  day_select:{
    background: Colors.green_1,
    color: 'white'
  },

  day_not_selectable: {
    background: '#9c9c9c',
    color: 'white'
  }
      
});


export const CalendarStyles = 
{
  text_center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
};