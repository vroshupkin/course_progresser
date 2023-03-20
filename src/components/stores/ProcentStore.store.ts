import { action, computed, makeObservable, observable } from 'mobx';

export class ProcentStore {
	@observable
	public procent: number;

	constructor(procent: number, public min = 0, public max = 1) {
		this.procent = procent;
		makeObservable(this);
	}

	@computed
	get getProcent(): number {
		return this.procent;
	}

	@computed
	get getValue(): number {
		const length = this.max - this.min;
		return this.procent * length + this.min;
	}

	@action
	setProcent(procent: number): void {
		this.procent = procent;
	}

	@action
	setValue(value: number): void {
		const length = this.max - this.min;
		this.procent = value / length;
	}
}
