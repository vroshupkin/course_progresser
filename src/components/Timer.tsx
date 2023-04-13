import { mergeObjects, TObject } from '../common/merge_json';
import { IStyleDictionary } from '../common/layout_tools';
import { createUseStyles } from 'react-jss';
import { observer } from 'mobx-react-lite';

import CSS from 'csstype';
import { observable, action, computed, makeObservable, makeAutoObservable, autorun, transaction } from 'mobx';
import { CSSProperties, FC, ReactElement, useState } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import {  BiPause } from 'react-icons/bi';
import { VscDebugRestart } from 'react-icons/vsc';
import { inspect } from 'util';


export class Timer_05_sec
{
  public Seconds = 0;
  public Tick = false;
  public Date = new Date(Date.now()); 
  
  private static instance: Timer_05_sec;

  private constructor()
  {
    setInterval(() => 
    {
      this.handler();
    }, 500);

    makeAutoObservable(this);

    return;
  }


  public static GetInstance()
  {
    if (!Timer_05_sec.instance) 
    {
      Timer_05_sec.instance = new Timer_05_sec();
    }

    return Timer_05_sec.instance;
  }

  handler()
  {
    this.Date = new Date(Date.now());

    const seconds = this.Date.getSeconds();
    if(seconds != this.Seconds)
    {
      this.Date = new Date(Date.now());
      this.Tick = !this.Tick;
      this.Seconds = seconds; 
    }
  }
    
}


export class TimerStore
{
  @observable
    timer_05 = Timer_05_sec.GetInstance();
  private date = new Date();
  private tick = this.timer_05.Tick;

  @observable
  public pause = false;

  private seconds = 0;

  @computed
  get Seconds() 
  {
    if(this.timer_05.Tick != this.tick && !this.pause)
    {
      this.tick = this.timer_05.Tick;
      this.seconds += 1;
    }
    
    return this.seconds;
  } 

  @computed public get date_now()
  {
    return this.timer_05.Date;
  }

  constructor(public AlTime = 0)
  {
    makeObservable(this);
  }

  @action
  updateDate()
  {
    this.date = new Date(Date.now());
  }


  ChangeName()
  {
    return;
  }

  @action
  Start()
  {
    this.pause = false;
  }

  @action
  Stop()
  {
    this.pause = true;
  }

  @action
  Reset()
  {
    this.pause = true;
    this.seconds = 0;
  }

}
interface ITimerProps {
  store: TimerStore;
  type: 'timeout' | 'common';
  name: string,
  timer_05: Timer_05_sec
}

const FCTimer: FC<ITimerProps> = (props) => 
{
  
  
  const colors = {
    gray_1: '#EBEBEB',
    gray_2: '#878787'
  };

  const classes = createUseStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      width: '310px',
      height: '130px',
      background: `${colors.gray_1}`,
      border: 'solid #878787 1px',

      '& span': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',  
        height: '100%',
        cursor: 'pointer',
        caretColor: 'transparent',
        userSelect: 'none',
      
        '&:hover': {
          background: 'white'
        }
      }
    },

    bold_font: {
      fontSize: '12px',
      fontWeight: 'bold',
    },

    text_center: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    
    name: {
      width: '271px',
      height: '29px',
      border: 'solid #000 1px',
      marginLeft: '9px',
      
    },
    status: {
      width: '20px',
      height: '20px',
      borderRadius: '20px',
      background: 'red',
      border: 'solid #000 1px',

      marginLeft: '4px'
      
    },
    row_1: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '12px'
    },

    row_2: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '12px'
    },
    
    current_time: {
      width: props.type == 'common'? '200px' : '70px',
      height: '29px',
      border: 'solid #000 1px',
      marginLeft: '49px'
    },

    delimeter: {
      display: props.type == 'common'? 'none' : 'block',
      width: '27px',
      height: '29px',
      border: 'solid #000 1px',
      marginLeft: '11px',
      
    },

    all_time: {
      display: props.type == 'common'? 'none' : 'block',
      width: '70px',
      height: '29px',
      border: 'solid #000 1px',
      marginLeft: '11px'
    },

    row_3: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '12px',

      '& $reset_icon, $play_icon, $pause_icon': {
        width: '27px',
        height: '27px',
      },

      '& $play, $pause, $reset': {
        border: 'solid 1px #000',
        width: '27px',
        height: '27px',
        '&:hover': {
          backgroundColor: '#fff',
          cursor: 'pointer'  
        }
      }
    },

    play:{
      marginLeft: '93px', 
    },
    pause: {
      marginLeft: '10px',
    },
    reset: {
      marginLeft: '10px',
    },
     
    reset_icon: {},
    play_icon: {},
    pause_icon: {}
    
  })();

  const status_style: CSSProperties = {

  };

  if(props.store.pause)
  {
    status_style.background = 'red';
  }
  else
  {
    status_style.background = 'yellow';
  }

  return(
    <div className={classes.container}>

      <div className={classes.row_1}>
        <div className={classes.name}>
          <span className={classes.bold_font}>{props.name}</span>
        </div>

        <div className={classes.status} style={status_style}></div>
      </div>
      
      <div className={classes.row_2}>
        <div className={classes.current_time}>
          <span>{props.store.Seconds}</span>
        </div>
        <div className={classes.delimeter}>
          <span>{'/'}</span>
        </div>
        <div className={classes.all_time}>
          <span>{'01:12:25'}</span>
        </div>
      </div>

      <div className={classes.row_3}>

        <div className={classes.play} onClick={() => props.store.Start()}>
          <BsFillPlayFill className={classes.play_icon}></BsFillPlayFill>
        </div>
        <div className={classes.pause} onClick={() => props.store.Stop()}>
          <BiPause className={classes.pause_icon}></BiPause>
        </div>
        <div className={classes.reset} onClick={() => props.store.Reset()}>
          <VscDebugRestart className={classes.reset_icon}></VscDebugRestart>
        </div>
      </div>
    </div>
  );

  
};

// const Status: FC = () => 
// {

//   const  = createUseStyles({
    
//     width: '20px',
//     height: '20px',
//     borderRadius: '20px',
//     background: 'red',
//     border: 'solid #000 1px',

//     marginLeft: '4px'
    
//   })();

//   return; 
// };

export const Timer = observer(FCTimer);

