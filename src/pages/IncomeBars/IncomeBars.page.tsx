import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { CalcStore, TimeConverter } from '../../components/TimeConverter';
import { InputNameStore, Timer, TimerStore } from '../../components/Timer';
import { Table, TableStore } from '../../components/Table';
import { IncomeBarStore, IncomeBarStores } from '../../components/stores/IncomeBar.store';
import { IncomeBarControl, IncomeBars } from '../../components/IncomeBar';
import { userStore } from '../../components/stores/user.store';
import { Navigate, redirect } from 'react-router-dom';
import { PrivatePage } from '../Private.page';


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

  // const styles = createUseStyles({
  //   container:
  //       {
  //         display: 'flex',
  //         flexDirection: 'column',
  //         justifyContent: 'center',
  //         alignContent: 'center'
  //       }
  // })();


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
          <IncomeBarControl stores={income_bar_stores}></IncomeBarControl>
          <Table store={table_store}></Table>
        </div>
      </div>
    </PrivatePage>

  // <>
  //   {userStore.token == null? <Navigate to='/login'/>:
      
  //     <div className={classes.main_font}>
  //       <div>
  //         <IncomeBars stores={income_bar_stores}></IncomeBars>
  //         <IncomeBarControl stores={income_bar_stores}></IncomeBarControl>
  //         <Table store={table_store}></Table>
  //       </div>
  //     </div>
  //   }
  // </>
   
  );
});
