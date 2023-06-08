import { createUseStyles } from 'react-jss';


export const LoadingStyle = createUseStyles({
  container: {
    '& span': {
      animationName: '$loading',
      animationDuration: '10s',
      animationIterationCount: 'infinite',

      color: 'green',
      fontWeight: '600'
    },
    height: '20px'
    
  },

  '@keyframes loading': {
    from: {
      fontSize: '100%'
    },
    '50%': {
      fontSize: '140%'
    },
    to: {
      fontSize: '100%'
    }
  }

});

