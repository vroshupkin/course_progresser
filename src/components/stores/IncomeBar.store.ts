import { computed, makeObservable, observable } from 'mobx';

export class IncomeBarStore 
{
  @observable public revenue: number;
  @observable public costs: number;
  @observable public order: number;

  @observable public stores?: IncomeBarStores;

  constructor(revenue: number, costs: number, order = -1, stores = null) 
  {
    this.revenue = revenue;
    this.costs = costs;
    this.order = order;
    if (stores) 
    {
      this.stores = stores;
    }

    makeObservable(this);
  }

  // @action
  // public addStore(s: ProgressBarStore | ProgressBarStore[]): void {
  // 	if (Array.isArray(s)) {
  // 		for (const store of s) {
  // 			this.stores.push(store);
  // 		}
  // 	} else {
  // 		this.stores.push(s);
  // 	}
  // }

  // public createStore(n: number): void {
  // 	for (let i = 0; i < n; i++) {
  // 		this.stores.push(new ProgressBarStore(50));
  // 	}
  // }

  // @computed
  // public get procents(): number {
  // 	let procents = 0;
  // 	for (const store of this.stores) {
  // 		procents += store.procents;
  // 	}

  // 	return Math.floor(procents / this.stores.length);
  // }
}

export class IncomeBarStores 
{
  @observable public stores: IncomeBarStore[];
  @observable public order_select: number;

  constructor(stores: IncomeBarStore[], order: number) 
  {
    this.stores = stores;
    this.order_select = order;

    makeObservable(this);
  }

  @computed public get sum(): number 
  {
    return this.stores.reduce(
      (prev, curr): number => prev + curr.revenue - curr.costs,
      0
    );
  }
}
