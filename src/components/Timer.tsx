import { mergeObjects, TObject } from '../common/merge_json';
import { IStyleDictionary } from '../common/layout_tools';
import { createUseStyles } from 'react-jss';
import { observer } from 'mobx-react-lite';
import CSS from 'csstype';
import { observable, action, computed, makeObservable } from 'mobx';
import { FC, ReactElement, useState } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import {  BiPause } from 'react-icons/bi';
import { VscDebugRestart } from 'react-icons/vsc';
export class TimerStore 
{
  @observable public date: Date;

  private timer: NodeJS.Timer;

  constructor() 
  {
    this.date = new Date(Date.now());
    this.timer = setInterval(this.updateTimer, 1000);

    makeObservable(this);
  }

  updateTimer(): void
  {

    
    return;   
  }
}

// class Timer
// {    
//     @observable private time: Date = new Date(Date.now());
    
//     public get Time(): Date 
//     {
//       return this.time
//     }


//     Tick() : void
//     {
//       this.time = new Date(Date.now());     
//     }
// }

interface ITimerProps {
  // store: TimerStore;
  a: string;
}

const FCTimer: FC<{a: string}> = (props) => 
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
        height: '100%'
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
      width: '70px',
      height: '29px',
      border: 'solid #000 1px',
      marginLeft: '49px'
    },

    delimeter: {
      width: '27px',
      height: '29px',
      border: 'solid #000 1px',
      marginLeft: '11px'
    },

    all_time: {
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
      }
    },

    play: { marginLeft: '93px' },
    pause: { marginLeft: '10px' },
    reset: { marginLeft: '10px' },

    reset_icon: {},
    play_icon: {},
    pause_icon: {}
    
  })();


  return(
    <div className={classes.container}>

      <div className={classes.row_1}>
        <div className={classes.name}>
          <span className={classes.bold_font}>{'Название таймера'}</span>
        </div>

        <div className={classes.status}></div>
      </div>
      
      <div className={classes.row_2}>
        <div className={classes.current_time}>
          <span>{'00:00:25'}</span>
        </div>
        <div className={classes.delimeter}>
          <span>{'/'}</span>
        </div>
        <div className={classes.all_time}>
          <span>{'01:12:25'}</span>
        </div>
      </div>

      <div className={classes.row_3}>

        <div className={classes.play}>
          <BsFillPlayFill className={classes.play_icon}></BsFillPlayFill>
        </div>
        <div className={classes.pause}>
          <BiPause className={classes.pause_icon}></BiPause>
        </div>
        <div className={classes.reset}>
          <VscDebugRestart className={classes.reset_icon}></VscDebugRestart>
        </div>
      </div>
    </div>
  );

  
};

export const Timer = observer(FCTimer);

