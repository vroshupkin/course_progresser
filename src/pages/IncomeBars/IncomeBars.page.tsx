import { observer } from 'mobx-react-lite';
import { FC, useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { CalcStore, TimeConverter } from '../../components/TimeConverter';
import { InputNameStore, Timer, TimerStore } from '../../components/Timer';
import { Table, TableStore } from '../../components/Table';
import { IncomeBarStore, IncomeBarStores } from './IncomeBars.store';
import { IncomeBarControl, IncomeBars } from './IncomeBar';
import { userStore } from '../../components/stores/user.store';
import { Navigate, redirect } from 'react-router-dom';
import { PrivatePage } from '../Private.page';
import { makeAutoObservable } from 'mobx';


const income_bar_store = new IncomeBarStore(100, 80);

const income_bar_stores: IncomeBarStores = new IncomeBarStores(
  [
    new IncomeBarStore(100, 80),
    new IncomeBarStore(70, 50),
    new IncomeBarStore(55, 45),
    new IncomeBarStore(99, 12),
    new IncomeBarStore(64, 55),
    new IncomeBarStore(60, 2),
    new IncomeBarStore(60, 60),
  ],
  0
);

let i = 0;
for (const store of income_bar_stores.stores) 
{
  store.stores = income_bar_stores;
  store.order = i;
  i++;
}

const table_store = new TableStore([
  [ 'Название', 'Тип', 'Стоимость', 'Дата' ],
  [ 'За приложение', '+', 15000, '23.03.23' ],
  [ 'Вода', '-', 300, '24.03.23' ],
  [ 'Еда', '-', 700, '24.03.23' ],
  [ 'Электричество', '-', 700, '24.03.23' ],
]);


export const IncomeBarsPage: FC<{a: string}> = observer(() => 
{
  const classes = createUseStyles({
    main_font: {
      '& *': {
        fontFamily: 'Anonymous Pro',
        fontSize: '14px',
        boxSizing: 'content-box'
      },
    },
  })();


  return(
    <PrivatePage>
      <div className={classes.main_font}>
        <div>
          <IncomeBars stores={income_bar_stores}></IncomeBars>
          <DaySelector/>

          <IncomeBarControl stores={income_bar_stores}></IncomeBarControl>
          <Table store={table_store}></Table>
        </div>
      </div>
    </PrivatePage>
  
  );
});


const graphWeekSelector_class = createUseStyles(
  {
    container: {
      display: 'flex',
    }
  }
);


const Colors = {
  blue_1: '#21BEEF'
};

const arrowClassList = createUseStyles(
  {
    common: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '39px',
      height: '29px',
      cursor: 'pointer',
      userSelect: 'none',

      '&:hover': {
        border: `1px solid ${Colors.blue_1}`
      }

    },

    left: {
      display: 'flex',
    },
  }
);


const graphWeekSelectorCell = createUseStyles(
  {
    common_1: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',

      width: '37px',
      height: '27px',
      flexShrink: 0,

      border: '1px solid #C4C4C4',
      userSelect: 'none',
      '&:hover': {
        borderColor: '#21BEEF'
      },

    },

    left: {
      borderRadius: '5px 0px 0px 5px',
    },

    right: {
      borderRadius: '0px 5px 5px 0px',
      marginRight: '37px'
    },

    select: {
      background: '#21BEEF',
      color: 'white'
    },

    common: {

    }
      
  }
);


type GraphWeekSelectorCellProps = {
  type: 'left' | 'right' | 'common',
  children: string | number,
  select: boolean,
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

const DayCell: FC<GraphWeekSelectorCellProps> = observer((props) => 
{
  const classList = graphWeekSelectorCell();  
  const classDiv =  `${classList.common_1} ${classList[props.type]} ${props.select? classList.select : ''}`;

  return(
    <div className={classDiv} onClick={props.onClick}>
      <span>{props.children}</span>
    </div>
  );
}
);


class DaySelectorStore
{
  // 1ый день на графике
  firstDay = new Date();
  selectedDay = new Date;

  constructor()
  {
    makeAutoObservable(this);
  }

  setSelectDay(date: Date)
  {
    this.selectedDay = date;
  }

  setFirstDay(date: Date)
  {
    this.firstDay = date;
  }
  

}


const daySelectorStore =  new DaySelectorStore();


type arrowProps = {
  type: '<' | '>',
  onClick: React.MouseEventHandler<HTMLDivElement>
}
const Arrow = (props: arrowProps) => 
{
  const classList = arrowClassList();
 
  return(
    <div className={classList.common} onClick={props.onClick}>
      <span>{props.type}</span>
    </div>
  );
};


export const DaySelector: FC<{}> = observer(() => 
{
  const classList = graphWeekSelector_class();
  const ref_div = useRef<HTMLDivElement>(null);
  const [ order, setOrder ] = useState(-1);
  

  const handler: React.MouseEventHandler = (e) => 
  {
    if(e.currentTarget)
    {
      setOrder(getOrderInSiblings(e.currentTarget as HTMLElement));
    }
  };
  
  const [ selectDate, setSelectDate ] = useState(new Date());
  const [ dayStart, setDayStart ] = useState(new Date());

  const changeStartDate = (count: number) => () =>
    setDayStart(changeDays(dayStart, count));

  return(
    <div className={classList.container} ref={ref_div}>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Arrow type='<' onClick={changeStartDate(-1)}/>
        <OneWeek setActiveDate={setSelectDate} day_counts={14} day_start={dayStart} selectDate={selectDate}/>
        <Arrow type='>' onClick={changeStartDate(1)}/>
      </div>
    </div>
  );
}
);

type OneWeekProps = 
{
  day_counts: number,
  day_start: Date,
  onClick?: React.MouseEventHandler<HTMLDivElement>,
  selectDate: Date,
  setActiveDate?: Function
}

const OneWeek = (props: OneWeekProps) => 
{
  const classList = graphWeekSelector_class();

  const days = range(props.day_counts).map(v => changeDays(props.day_start, v));

  const changeSelectedDate = (e: React.MouseEvent) => 
  {
    if(e.currentTarget && props.setActiveDate)
    {
      const order = getOrderInSiblings(e.currentTarget as HTMLElement);
      
      props.setActiveDate(days[order]);
    }
      
  };

  return(
    <div className={classList.container}>
      {
        days
          .map((d, i) => 
            <DayCell 
              type={d.getDay() == 1 % 7? 'left' : d.getDay() % 7 == 0 ? 'right' : 'common'}
              onClick={changeSelectedDate}
              children={d.getDate()}
              select={ equailtyDay(d, props.selectDate) }
            />
          )
      }

    </div>
  );
};

/**
 * @example range(6) => [0, 1, 2, 3, 4, 5]; range(2, 6) => [2, 3, 4, 5]
 */
const range = (start: number, end?: number) => 
{
  if(end === undefined)
  {
    end = start;
    start = 0;
  }
  
  return new Array(end- start).fill(0).map((_, i) => i + start);  
};


/** 
 * Переводит дату на value вперед у экземпляра класса 
 * immutablecp[yq]
 */ 
const changeDays = (date: Date, value: number) => 
{ 
  date = copyDate(date);
  date.setDate(date.getDate() + value); 
  
  return date;
};

/**
 * Copy date instance
 */
const copyDate = (date: Date) => new Date(date.getTime());

/**
 * Это один день?
 */
const equailtyDay = (d_1: Date, d_2: Date) =>   
  d_1.getFullYear() === d_2.getFullYear() &&
  d_1.getMonth() === d_2.getMonth() &&
  d_1.getDate() === d_2.getDate();


const date_now = new Date();
const week = range(7).map(v => changeDays(copyDate(date_now), v));

// console.log(week.map(d => d.getDay()));


/**
 * HTML DOM 
 * Возвращает порядок элемента относительно его саблингов
 */
const getOrderInSiblings  = (elem: HTMLElement) => 
{
  const parent = elem.parentNode;

  if(parent)
  {
    for(let i = 0; i < parent.children.length; i++)
    {
      if(elem === parent.children[i])
      {
        return i;
      }
    }
  }

  return -1;
};

