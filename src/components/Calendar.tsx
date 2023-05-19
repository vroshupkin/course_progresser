import { observer } from 'mobx-react-lite';
import CSS from 'csstype';
import {
  createRef,
  FC,
  useState,
} from 'react';
import { createUseStyles } from 'react-jss';
import { CalendarStore } from './stores/Calendar.store';


interface CalendarProps {
  store: CalendarStore;
}

export const Calendar: FC<CalendarProps> = observer(
  ({ store }) => 
  {
    const text_center_style = 
    {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
    

    const classes = createUseStyles({
      container:{
        width: '380px',
        height: '192px',
        background: '#EBEBEB'
      },

      date: {
        color: 'white',
        display: 'flex',
        justifyContent: 'space-around',
        paddingTop: '8px',
        marginBottom: '6px',
        '& div': {
          height: '19px',
          background: '#1A6400',
          ...text_center_style
        },
        '& div:nth-child(n + 1)': 
        {
          width: '64px'
        },
        '& div:nth-child(2)': 
        {
          width: '79px'
        },

        
      },

      year: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '10px',
        '& div': {
          width: '36px',
          height: '20px',
          ...text_center_style,
          cursor: 'pointer',
        },
      },

      year_next_or_previous: {
        '&:hover': {
          background: 'white',
        }
      },

      year_bypass: {
        background: '#D9D9D9',
        '&:hover': {
          background: 'white',
        }
      },

      year_select: {
        background: '#1A6400',
        color: 'white',
        '&:hover': {
          background: 'white',
          color: 'black'
        }
      },

      now_year: {
        background: '#1A6400'
      },

      month_select: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginLeft: '2%',
        marginRight: '2%',
        gap: '3px',
        marginBottom: '10px',
        
        '& div': {
          height: '16px',
          width: '54px',
          background: '#FFFFFF',
          cursor: 'pointer',
          
          ...text_center_style,
          '&:hover': {
            background: '#ADADAD',
            color: 'white',
          },

        }
        
      },

      day_select: {
        
        '& div': {
          display: 'flex',
          justifyContent: 'center',
          
          
          '& div': {
            height: '12px',
            width: '44px',
            cursor: 'pointer',
            ...text_center_style,

            '&:hover': {
              background: 'white',
              color: 'black'
            }

          }
          
        }
      }
     
    })();

    const refs: { [s: string]: React.RefObject<HTMLDivElement> } = {
      year_ref: createRef<HTMLDivElement>(),
    //   costs: createRef<HTMLInputElement>(),
    //   row: createRef<HTMLInputElement>(),
    };

    const [ startYear, setStartYear ] = useState(store.date.getFullYear() - 2);
    

    const YearDiv: FC<{year: number}> = ({ year }) => 
    {      
      const class_name = year == store.date.getFullYear()? classes.year_select : classes.year_bypass;

      return(
        <div className={class_name} onClick={() => store.changeYear(year)}>
          <span>{year}</span>
        </div>
      );
    };

    
    const YearDivNext = () =>   
      <div className={classes.year_next_or_previous} onClick={() => setStartYear(startYear + 1)}>
        <span>{'>>'}</span>
      </div>;
    
    const YearDivPrevious = () => 
      <div className={classes.year_next_or_previous} onClick={() => setStartYear(startYear - 1)}>
        <span>{'<<'}</span>
      </div>;

    return (
      <div className={classes.container}>

        <div className={classes.date}>
          <div>
            <span>{store.date.getDate()}</span>
          </div>
          <div>
            <span>{store.date.getMonth() + 1}</span>
          </div>
          <div>
            <span>{store.date.getFullYear()}</span>
          </div>
        </div>

        <div className={classes.year} ref={refs.year_ref}>
          <YearDivPrevious/>
          <YearDiv year={startYear}/>
          <YearDiv year={startYear + 1}/>
          <YearDiv year={startYear + 2}/>
          <YearDiv year={startYear + 3}/>
          <YearDiv year={startYear + 4}/>
          <YearDivNext/>
        </div>

        <div className={classes.month_select}>
          <div><span>Январь</span></div>
          <div><span>Февраль</span></div>
          <div><span>Март</span></div>
          <div><span>Апрель</span></div>
          <div><span>Май</span></div>
          <div><span>Июнь</span></div>
          <div><span>Июль</span></div>
          <div><span>Август</span></div>
          <div><span>Сентябрь</span></div>
          <div><span>Октябрь</span></div>
          <div><span>Ноябрь</span></div>
          <div><span>Декабрь</span></div>
       
        </div>


        <div className={classes.day_select}>
          <div>
            <div><span>1</span></div>
            <div><span>2</span></div>
            <div><span>3</span></div>
            <div><span>4</span></div>
            <div><span>5</span></div>
            <div><span>6</span></div>
            <div><span>7</span></div>
          </div>

          <div>
            <div><span>8</span></div>
            <div><span>9</span></div>
            <div><span>10</span></div>
            <div><span>11</span></div>
            <div><span>12</span></div>
            <div><span>13</span></div>
            <div><span>14</span></div>
          </div>

          <div>
            <div><span>15</span></div>
            <div><span>16</span></div>
            <div><span>17</span></div>
            <div><span>18</span></div>
            <div><span>19</span></div>
            <div><span>20</span></div>
            <div><span>21</span></div>
          </div>

          <div>
            <div><span>22</span></div>
            <div><span>23</span></div>
            <div><span>24</span></div>
            <div><span>25</span></div>
            <div><span>26</span></div>
            <div><span>27</span></div>
            <div><span>28</span></div>
          </div>

          <div>
            <div><span>29</span></div>
            <div><span>30</span></div>
            <div><span>31</span></div>
            <div><span>1</span></div>
            <div><span>2</span></div>
            <div><span>3</span></div>
            <div><span>4</span></div>
          </div>


        </div>
      </div>
    );
  }
);