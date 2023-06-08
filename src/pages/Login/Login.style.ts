import Css from 'csstype';
import { createUseStyles } from 'react-jss';

const ConvertPx = (str: string, cb: (num: number) => number) => 
{
  const num = Number(str.slice(0, -2));
  
  return cb(num) + 'px';
};


const container_width = 400;
const container_height = 200;


export const LoginSizes = 
{
  container: {
    width: '50vw'
  }
};

/**
 *  {@link https://stackoverflow.com/questions/2005954/center-a-positionfixed-element stackoverflow}
 */
export const LoginCenterScreenStyle: Css.Properties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
};


export const LoginContainerClasses = createUseStyles({
  container: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    '@media (height >= 500px) ': {
      marginTop: (-container_height / 2) + 'px',
      marginLeft: (-container_width / 2) + 'px'
    },

  }
});

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