import { action, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react-lite';

import { FC } from 'react';

export class StoreExample_1
{
    @observable public num = 0;

    constructor()
    {
      
      makeObservable(this);
    }

    @action
    public increment()
    {
      this.num += 1;
    }
    
}

const FCViewNum: FC<{store: StoreExample_1}> = ({ store }) => 
{

  return(
    <>
      <div>{store.num}</div>
    </>
  );
};

const FCChangeNum: FC<{store: StoreExample_1}> = ({ store }) => 
{

  return(
    <>
      <button onClick={() => store.increment()} children={'+'}/>
    </>
  );
};

export const ViewNum = observer(FCViewNum);
export const ViewChangeNum = observer(FCChangeNum);

export const Example_1: FC<{store: StoreExample_1}> = ({ store }) => 
{
  return(
    <>
      <ViewNum store={store}/>
      <ViewChangeNum store={store}/>
    </>
  );
};


// Достаточно чтобы один из return выдывал неправильный результат
// чтобы была ошибка типизации, несмотря даже, если код недосягаем
// const a = (b: number): string => 
// {
//   return 'abc';
//   if(b == 1)
//   {
//     return 'abc';
//   }
//   else if (b == 2)
//   {
//     return 1;
//   }
  
//   return 'asd';
// };