import Css from 'csstype';
import { createUseStyles } from 'react-jss';

const ConvertPx = (str: string, cb: (num: number) => number) => 
{
  const num = Number(str.slice(0, -2));
  
  return cb(num) + 'px';
};


const container_width = 400;
const container_height = 200;

const container_width_mobile = 100;
const container_height_moblie = 75;


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

