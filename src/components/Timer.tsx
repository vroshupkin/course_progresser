import { mergeObjects, TObject } from '../common/merge_json';
import { IStyleDictionary } from '../common/layout_tools';
import { createUseStyles } from 'react-jss';
import { observer } from 'mobx-react-lite';


import CSS from 'csstype';
import { observable, action, computed, makeObservable, makeAutoObservable, autorun, transaction } from 'mobx';
import { CSSProperties, FC, ReactElement, useEffect, useState } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import {  BiPause, BiSave } from 'react-icons/bi';
import { VscDebugRestart } from 'react-icons/vsc';
import { inspect } from 'util';
import { center_block_flex } from '../common/css_helper/classes';


export class Timer_05_sec
{
  public Seconds = 0;
  public Tick = false;
  public Date = new Date(Date.now()); 
  
  private static instance: Timer_05_sec;

  private constructor()
  {
    makeAutoObservable(this);
    setInterval(() => 
    {    
      this.handler();
    }, 200);
  
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
  
  @action
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
  // @observable
  timer_05:Timer_05_sec;
  private date = new Date();
  private tick = true;

  @observable
  public pause = false;

  private seconds = 0;

  @computed
  get Seconds() 
  {
    if(this.AllTime != -1 && this.AllTime <= this.seconds)
    {
      return this.seconds;  
    }

    if(this.pause)
    {
      return this.seconds;  
    }
    if(this.timer_05.Tick != this.tick)
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

  constructor(public AllTime = -1)
  {

    
    this.timer_05 = Timer_05_sec.GetInstance();
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

export class InputNameStore
{
  name: string;

  view: 'show' | 'input';

  constructor(name = 'Init name')
  {
    this.name = name;
    this.view = 'show';
    makeAutoObservable(this);
  }

  Save(new_name: string)
  {
    this.name = new_name;
    this.view = 'show';
  }

  
  OpenInput()
  {
    this.view = 'input';
  }
}


interface IInputName {
  store: InputNameStore,
  classNames: {
    input: string,
    button: string,
    text: string,
    containerText: string
  },
}


const FCInputName: FC<IInputName> = (
  { store, classNames }) => 
{


  let typing_name = store.name;
  
  const Input = () => 
  {
    return (
      <>
        <input className={classNames.input} onChange={(e) => typing_name = e.currentTarget.value } autoFocus></input>
        <BiSave className={classNames.button} onClick={(e) => store.Save(typing_name)}></BiSave>
      </>
    );
  };


  const ViewName = () => 
  {
    return(
      <>
        <div 
          className={classNames.containerText} 
          onClick={() => 
          {
            store.OpenInput();
          }}
        >
          
          <span className={classNames.text}>{store.name}</span>
        </div>
      </>
    );
  };
  
  return (
    <>
      {store.view == 'input'
        ?<Input/>
        :<ViewName/>
      }
    </>

  );
    
};

export const InputName = observer(FCInputName);

interface ITimerProps {
  store: TimerStore;
  type: 'timeout' | 'common';
  input_store: InputNameStore
}

const FCTimer: FC<ITimerProps> = ({ store, type, input_store }) => 
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
      height: '140px',
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
          background: 'white',
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

      marginLeft: '4px',

      
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
      width: type == 'common'? '200px' : '70px',
      height: '29px',
      border: 'solid #000 1px',
      marginLeft: '49px'
    },

    delimeter: {
      display: type == 'common'? 'none' : 'block',
      width: '27px',
      height: '29px',
      border: 'solid #000 1px',
      marginLeft: '11px',
      
    },

    all_time: {
      display: type == 'common'? 'none' : 'block',
      width: '70px',
      height: '29px',
      border: 'solid #000 1px',
      marginLeft: '11px'
    },

    row_3: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '12px',
      height: '50px',

      '& $reset_icon, $play_icon, $pause_icon': {
        width: '27px',
        height: '27px',
      },

      '& $play, $pause, $reset': {
        border: 'solid 1px #000',
        width: '27px',
        height: '27px',
        
        // '&::before': {

        // }
        '&:hover': {
          backgroundColor: '#fff',
          cursor: 'pointer',
          border: 'solid 2px #000',
        
          transform: 'scale(1.1)',
          transition: '200ms'
          
        },
      },

      '& $play_icon, $pause_icon, $reset_icon': {
        display: 'block',
        margin: 'auto',
        width: '100%',
        height: '100%'
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
     
    reset_icon: {
      
    },
    play_icon: {},
    pause_icon: {},

    save_button: {},
    input_change_name: {},
    
  })();

  const status_style: CSSProperties = {

  };

  if(type == 'timeout')
  {
    if(!store.pause && store.Seconds == store.AllTime)
    {
      status_style.background = 'lime';
    }
    else if(store.pause)
    {
      status_style.background = 'red';
    }
    else
    {
      status_style.background = 'yellow';
    }
  }

  if(type == 'common')
  {
    status_style.background = store.pause == true? 'red' : 'yellow';
  }


  const get_time = (seconds: number) => 
  {
    const hours = Math.floor(seconds/3600);
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds/60);
    seconds -= minutes * 60;
     
    return `${hours}:${minutes}:${seconds}`;
  };

  
  const inputNameClassNames = createUseStyles(
    {
      
      containerText: {
        width: '271px',
        height: '29px',
        border: 'solid #000 1px',
        marginLeft: '9px',
        
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        '&:hover': {
          background: '#fff'
        }
      },
      text: {
        fontSize: '12px',
        fontWeight: 'bold',
      },
      button: {
        height: '29px',
        width: '29px'
      },

      input: {
        width: '271px',
        height: '29px',
        border: 'solid #000000 2px',
        marginLeft: '9px',
        background: '#EBEBEB',
        textAlign: 'center'
      }

    
    }
  )();
  
  
  return(
    <div className={classes.container}>

      <div className={classes.row_1}>
        <InputName 
          store={input_store}
          classNames={inputNameClassNames}
        />
        
        <div className={classes.status} style={status_style}></div>
      </div>
      
      <div className={classes.row_2}>
        <div className={classes.current_time}>
          <span>{get_time(store.Seconds)}</span>
        </div>
        <div className={classes.delimeter}>
          <span>{'/'}</span>
        </div>
        <div className={classes.all_time}>
          <span>{get_time(store.AllTime)}</span>
        </div>
      </div>

      <div className={classes.row_3}>

        <div className={classes.play} onClick={() => store.Start()}>
          <BsFillPlayFill className={classes.play_icon}></BsFillPlayFill>
        </div>
        <div className={classes.pause} onClick={() => store.Stop()}>
          <BiPause className={classes.pause_icon}></BiPause>
        </div>
        <div className={classes.reset} onClick={() => store.Reset()}>
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

