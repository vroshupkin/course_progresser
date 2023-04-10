import {
  makeAutoObservable,
  observable,
  computed,
  action,
  autorun,
  makeObservable,
} from 'mobx';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { deflate } from 'zlib';

export const MobxTimer: React.FC = () => 
{
  return (
    <>
      <div>1</div>
      <div>2</div>
    </>
  );
};

interface ITodo {
  task: string;
  completed: boolean;
  assignee: null;
}

class Reporter 
{
  public counter = 0;

  log(str: any): void 
  {
    console.log(`${this.counter}: ${str}`);

    this.counter++;
  }
}

const reporter = new Reporter();
class TodoStore 
{
  public todos: ITodo[] = [];
  public pendingRequests = 0;

  constructor()	
  {
    makeObservable(this, {
      todos: observable,
      completedTodosCount: computed,
      report: computed,
      addTodo: action,
      pendingRequests: observable,
    });
    reporter.log('constructor run');
    // autorun(() => console.log(this.report));
    autorun(() => console.log('autorun'));

    // console.log(this);
  }

  // Возвращает количество выполненных заданий
  get completedTodosCount(): number 
  {
    reporter.log('completedTodosCount run');

    return this.todos.filter((todo) => todo.completed === true).length;
  }

  get report(): string 
  {
    reporter.log('report run');

    if (this.todos.length === 0) 
    {
      return '<none>';
    }
    const nextTodo = this.todos.find((todo) => todo.completed === false);
    return (
      `Next todo: "${nextTodo ? nextTodo.task : '<none>'}". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`
    );
  }

  addTodo(task: string): void 
  {
    reporter.log('addToDo run');
    this.todos.push({
      task: task,
      completed: false,
      assignee: null,
    });
  }
}

const todoStore = new TodoStore();
todoStore.addTodo('Задание 1');
// todoStore.addTodo('Задание 2');
// todoStore.todos[0].completed = true;
// todoStore.todos[1].task = 'try MobX in own project';
// todoStore.todos[0].task = 'grok MobX tutorial';

// console.log(todoStore.report);

class Doubler 
{
  public value;

  constructor(value: number) 
  {
    makeObservable(this, {
      value: observable,
      double: computed,
      increment: action,
      // fetch: flow,
    });
    this.value = value;
  }

  get double(): number 
  {
    return this.value * 2;
  }

  increment(): void 
  {
    this.value++;
  }

  // *fetch() {
  // 	const response = yield fetch('/api/value');
  // 	this.value = response.json();
  // }
}

class Store_1 
{
  constructor(public num: number) 
  {
    makeObservable(this, {
      num: observable,
      level: computed,
    });
  }

  get level(): number 
  {
    const constrainValues = [0, 30, 50, 70];

    for (let i = 0; i < constrainValues.length; i++) 
    {
      if (this.num < constrainValues[i]) 
      {
        return i;
      }
    }
    return constrainValues.length;
  }
}

interface IWithStore1 {
  store: Store_1;
}
const ShowVal: React.FC<IWithStore1> = observer(({ store }) => 
{
  return <div>{store.num}</div>;
});

const ShowLevel: React.FC<IWithStore1> = observer(({ store }) => 
{
  const colors = ['red', 'yellow', 'orange', 'green', 'white'];
  const colorDiv = useRef<HTMLDivElement>(null);

  if (colorDiv.current) 
  {
    colorDiv.current.style.backgroundColor = colors[store.level];
  }

  return <div ref={colorDiv}>{store.level}</div>;
});

// Используется
const addSubClick = (store: any, key: string, delta: number): any => 
{
  if (store[key] != undefined) 
  {
    return (): void => 
    {
      store[key] += delta;
    };
  }

  console.log(store[key]);

  throw new Error(`Неправильный ключ в сторе: ${key}`);
};

const SetVal: React.FC<IWithStore1> = observer(({ store }) => 
{
  const plusStr = '+5';
  const minusStr = '-5';

  return (
    <>
      <button onClick={addSubClick(store, 'num', Number(minusStr))}>
        {minusStr}
      </button>
      <button onClick={addSubClick(store, 'num', Number(plusStr))}>
        {plusStr}
      </button>
    </>
  );
});

const store_1 = new Store_1(20);
console.log(typeof store_1);

export const MobxComponent: React.FC<{}> = () => 
{
  return (
    <>
      <ShowVal store={store_1}></ShowVal>
      <ShowLevel store={store_1}></ShowLevel>
      <SetVal store={store_1}></SetVal>
    </>
  );
};

const doubler = new Doubler(2);
doubler.increment();
doubler.increment();
doubler.increment();
doubler.increment();
console.log(doubler.value);

// function observer(arg0: { store: any; }): import("react").FC<{ num: number; }> {
// 	throw new Error('Function not implemented.');
// }
