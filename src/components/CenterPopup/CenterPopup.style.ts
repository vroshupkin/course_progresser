import { createUseStyles } from 'react-jss';


export const CenterPopupClasses = createUseStyles({
  display: {
    position: 'fixed',
    top: '50%',
    left: '50%'
    // margin: 'auto',
  },

  hide: {
    display: 'none'
  }
});