import Css from 'csstype';
import { createUseStyles } from 'react-jss';


export const LoginClasses = createUseStyles({
  wrapper: 
    {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100vh'
    },

  container:
        {

          width: '50vw',
          height: '200px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',

          position: 'relative',
          
          '@media (min-height: 300px)': {
            top: '-20vh',
          },

          gap: '5px',
          border: 'solid 1px',
          borderRadius: '7px',
          padding: '10px',
          background: '#d4d4d4',
        },
  text: 
    {
      display: 'flex',
      justifyContent: 'center',
      '& span': {
        fontSize: '20px',
        fontWeight: 'bold'
      }
      
    },

  button:
    {
      background: 'white',
      '&:hover': {
        background: '#dbdbdb',
        cursor: 'pointer'
      },
      height: '25px'
    },

  input:
    {
      height: '20px'
    },
  

});

export const StyleLoginRedSpan = createUseStyles({
  container: {
    height: '15px',
    display: 'flex',
    justifyContent: 'center',

    '& span': {
      fontSize: '16px',
      fontWeight: '600',
      color: '#ae0000'
    }
  },
  
  
});

export const LoginLoadingStyle = createUseStyles({
  center: {
    display: 'flex',
    justifyContent: 'center'
  }
});