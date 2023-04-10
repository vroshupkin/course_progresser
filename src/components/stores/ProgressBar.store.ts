import { observable, action, computed, makeObservable } from 'mobx';

export class StoreManyProgressBar 
{
  @observable public stores: ProgressBarStore[];

  constructor() 
  {
    this.stores = [];
    makeObservable(this);
  }

  @action
  public addStore(s: ProgressBarStore | ProgressBarStore[]): void 
  {
    if (Array.isArray(s)) 
    {
      for (const store of s) 
      {
        this.stores.push(store);
      }
    }
    else 
    {
      this.stores.push(s);
    }
  }

  public createStore(n: number): void 
  {
    for (let i = 0; i < n; i++) 
    {
      this.stores.push(new ProgressBarStore(50));
    }
  }

  @computed
  public get procents(): number 
  {
    let procents = 0;
    for (const store of this.stores) 
    {
      procents += store.procents;
    }

    return Math.floor(procents / this.stores.length);
  }
}

export class ProgressBarStore 
{
  @observable
  public procents: number;

  constructor(procents: number) 
  {
    this.procents = procents;

    makeObservable(this);
  }

  @action
  changeProcents(procents: number): void 
  {
    this.procents = procents;
  }
}
