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

export const ComponentImageSelectorStyle = createUseStyles({
  container: {
    position: 'relative',
    marginBottom: '10px',
    width: '324px',
    height: '50px',
    display: 'flex',
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: '5px',
    border: '1px solid #000',
    background: '#F3F3F3',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',

    '&:hover': {
      background: '#bdbdbd'
    },

    '& span': {
      fontSize: '14px'
    },
  }
});


export const UserPageStyleTittle = createUseStyles({
  container: {
    width: '324px',
    height: '50px',
    display: 'flex',
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: '5px',
    border: '1px solid #000',
    background: '#F3F3F3',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',

    '& span': {
      fontSize: '14px'
    }

  }
});

