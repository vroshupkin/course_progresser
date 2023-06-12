import { createUseStyles } from 'react-jss';


export const UserPageClasses = createUseStyles({
  container: {
    display: 'flex',
        
  },

  image: {
    width: '256px',
    height: '160px',
    borderRadius: '16px'
  },

  
});

export const UserPageStyleTittle = createUseStyles({
  container: {
    width: '324px',
    height: '50px',
    display: 'flex',
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
    // alignContent: 'center',
    // justifyItems: 'center',
    
    '& span': {
      fontSize: '14px'
    }

  }
});

