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
