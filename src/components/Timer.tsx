import { mergeObjects, TObject } from '../common/merge_json';
import { IStyleDictionary } from '../common/layout_tools';
import { createUseStyles } from 'react-jss';
import { observer } from 'mobx-react-lite';
import CSS from 'csstype';

// export class TimerStore 
// {
//   @observable public data: (string | number)[][];

//   constructor(data: (string | number)[][]) 
// {
//     this.data = data;
//     makeObservable(this);
//   }

//   updateTimer() 
// {}
// }
