import { Styles, createUseStyles } from 'react-jss';

export const Colors = 
{
  green_1: '#1A6400',
  calendar_background: '#EBEBEB'
    
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


export const CalendarStyles = 
{
  text_center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  },

  day_cell_div: {
    ...CalendarSizes.day_div,
    ...CalendarStyles.text_center,
    cursor: 'pointer',
          
    '&:hover': {
      background: 'white',
      color: 'black'
    }
  },

  flex_element_row: {
    display: 'flex',
    justifyContent: 'center',
    userSelect: 'none',
  },

  main_container: {
    ...CalendarSizes.container,
    background: `${Colors.calendar_background}`
  },

  year: {
        
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '10px',
    '& div': {
      ...CalendarSizes.year_div,
      ...CalendarStyles.text_center,
      cursor: 'pointer',
      userSelect: 'none',
          
    },
  },

  year_select: {
    background: '#1A6400',
    color: 'white',
  },

  year_next_or_previous: {
    '&:hover': {
      background: 'white',
    }
  },

  year_bypass: {
    background: '#D9D9D9',
    '&:hover': {
      background: 'white',
    }
  },


  now_year: {
    background: '#1A6400'
  },

      
});

export const CalendarMonth = createUseStyles({
  month: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginLeft: '2%',
    marginRight: '2%',
    gap: '3px',
    marginBottom: '10px',
        
    '& div': {
      height: '16px',
      width: '54px',
      cursor: 'pointer',
      userSelect: 'none',
          
      ...CalendarStyles.text_center,
    }
        
  },

  month_select: {
    background: '#1A6400',
    color: 'white',
  },

  
  month_bypass: {
    background: '#FFFFFF',
    '&:hover': {
      background: '#ADADAD',
      color: 'white',
    },
  },
});


export const CalendarDisplayDateClasses = createUseStyles({
  date: {
    color: 'white',
    display: 'flex',
    justifyContent: 'space-around',
    paddingTop: '8px',
    marginBottom: '6px',
    '& div': {
      height: '19px',
      background: '#1A6400',
      ...CalendarStyles.text_center,
          
      userSelect: 'none',
          
    },
    '& div:nth-child(n + 1)': 
        {
          width: '64px'
        },
    '& div:nth-child(2)': 
        {
          width: '79px'
        },
    
  },
});