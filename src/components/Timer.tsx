import { mergeObjects, TObject } from '../common/merge_json';
import { IStyleDictionary } from '../common/layout_tools';
import { createUseStyles } from 'react-jss';
import { observer } from 'mobx-react-lite';
import { JssStyle } from 'jss';

import CSS from 'csstype';
import { observable, action, computed, makeObservable, makeAutoObservable, autorun, transaction } from 'mobx';
import { CSSProperties, FC, ReactElement, SetStateAction, useEffect, useState } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import {  BiPause, BiSave } from 'react-icons/bi';
import { VscDebugRestart } from 'react-icons/vsc';
import { inspect } from 'util';
import { center_block_flex } from '../common/css_helper/classes';
import { SecondsTo_hh_mm_ss, TimeParser } from '../common/parsers';
import { colors } from './styles/colors';

export const timer_container_class: JssStyle = 
  {
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
  };

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


export class TimeStore
{
  @observable public seconds;

  constructor(seconds = 0)
  {
    this.seconds = seconds;
    makeObservable(this);
  }

  @action
  ChangeSeconds(seconds: number)
  {
    this.seconds = seconds;
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

  @observable
  private seconds = 0;

  @observable
  public AllTime;
  
  @action
  changeSecond(sec: number)
  {
    this.seconds = sec;
  }

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
      this.changeSecond(this.seconds + 1);
    }
    
    return this.seconds;
  } 

  @computed public get date_now()
  {
    return this.timer_05.Date;
  }

  constructor(AllTime = -1)
  {
    this.AllTime = AllTime;

    this.timer_05 = Timer_05_sec.GetInstance();
    makeObservable(this);
  }

  @action
  ChangeAllTime(all_time: number)
  {
    this.AllTime = all_time;
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

}


export const InputName: FC<IInputName> = observer((
  { store }) => 
{
  let typing_name = store.name;

  
  const class_names = createUseStyles(
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
      },

      is_validate: {},
      not_validate: {}
    
    }
  )();
  const input_on_change = (e: React.ChangeEvent<HTMLInputElement>) => 
  {
    typing_name = e.currentTarget.value;
  };


  const Input = () => 
  {
    return (
      <>
        <input className={class_names.input} onChange={ input_on_change } autoFocus></input>
        <BiSave className={class_names.button} onClick={(e) => store.Save(typing_name)}></BiSave>
      </>
    );
  };


  const ViewName = () => 
  {
    return(
      <>
        <div 
          className={class_names.containerText} 
          onClick={() => 
          {
            store.OpenInput();
          }}
        >
          
          <span className={class_names.text}>{store.name}</span>
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
    
});


interface IInputTime {
  store: TimerStore;

}
export const InputTime: FC<{store: TimerStore}> = observer(
  ({ store }) => 
  {
    const [ mode, change_mode ] = useState<'view' | 'input'>('view');

    const class_names = createUseStyles(
      {
      
        containerText: {
          width: '70px',
          height: '29px',
          border: 'solid #000 1px',
          marginLeft: '9px',
        
          display: 'flex' ,
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
          width: '70px',
          height: '29px',
          border: 'solid 2px',
          
          marginLeft: '9px',
          background: '#EBEBEB',
          textAlign: 'center',
          borderColor: '#f3b200',

          '&:focus': {
            outline: 'none !important',
            borderRadius: '8px',  
          },

          '&$is_validate': {
            borderColor: 'green'
          },

          '&$not_validate': {
            borderColor: 'red',
          },
          
          
        },

        is_validate: {},
        not_validate: {},
        is_not_changed: {}

    
      }
    )();
    

    let all_time = 0;


    const input_on_change = (e: React.ChangeEvent<HTMLInputElement>) => 
    {
      all_time = TimeParser(e.currentTarget.value);
      
      e.currentTarget.classList.remove(class_names.not_validate);
      e.currentTarget.classList.remove(class_names.is_validate);

      if(all_time != -1 )
      {  
        e.currentTarget.classList.add(class_names.is_validate);
      }
      else
      {
        e.currentTarget.classList.add(class_names.not_validate);
      }
    };
  
    const input_save = () => 
    {
      if(all_time > 0)
      {
        store.ChangeAllTime(all_time);
        change_mode('view');
      }

      if(all_time == 0)
      {
        change_mode('view');
      }
    };

  
    const Input = () => 
    {
      return (
        <>
          <input className={class_names.input}  onChange={ input_on_change } autoFocus placeholder={SecondsTo_hh_mm_ss(store.AllTime)}></input>
          <BiSave className={class_names.button} onClick={ input_save }></BiSave>
        </>
      );
    };


    const ViewName = () => 
    {
      return(
        <>
          <div 
            className={class_names.containerText} 
            onClick={() => 
            {
              change_mode('input');
            }}
          >
          
            <span className={class_names.text}>{SecondsTo_hh_mm_ss(store.AllTime)}</span>
          </div>
        </>
      );
    };
  
    return (
      <>
        {mode == 'input'
          ?<Input/>
          :<ViewName/>
        }
      </>

    );
    
  });


interface ITimerProps {
  store: TimerStore;
  type: 'timeout' | 'common';
  input_store: InputNameStore,
  input_all_time_store: InputNameStore
}

export const Timer: FC<ITimerProps> = observer(
  (
    { store,
      type,
      input_store,
      input_all_time_store 
    }) => 

  {


    const classes = createUseStyles({
      container: timer_container_class,

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
      if(store.Seconds >= store.AllTime)
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

  
    return(
      <div className={classes.container}>

        <div className={classes.row_1}>
          <InputName store={input_store}/>
        
          <div className={classes.status} style={status_style}></div>
        </div>
      
        <div className={classes.row_2}>
          <div className={classes.current_time}>
            <span>{SecondsTo_hh_mm_ss(store.Seconds)}</span>
          </div>
          <div className={classes.delimeter}>
            <span>{'/'}</span>
          </div>

          {type == 'timeout'
            ?<InputTime store={store}></InputTime>
            :<></>
          }   

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

  
  });


