import { observer } from 'mobx-react-lite';
import CSS from 'csstype';
import { createRef, FC, useRef } from 'react';
import { IncomeBarStore, IncomeBarStores } from './stores/IncomeBar.store';

interface IncomeBarProps {
	store: IncomeBarStore;
}

export const IncomeBar: FC<IncomeBarProps> = observer(({ store }) => {
	const { revenue, costs } = { ...store };

	const container_style: CSS.Properties = {
		position: 'relative',
		height: '200px',
		width: '20px',
	};

	// const isPositiveProfit = revenue_value > cost_values;

	// Прибыль
	const profit_style: CSS.Properties = {
		position: 'absolute',
		bottom: '50%',

		height: `${revenue - costs}px`,
		right: '5px',

		width: '15px',
		backgroundColor: 'green',

		border: 'solid 1px',
		boxSizing: 'border-box',
	};

	// Доход
	const revenue_style: CSS.Properties = {
		position: 'absolute',
		bottom: '50%',
		height: `${revenue}px`,

		backgroundColor: 'yellow',
		width: '20px',

		borderColor: 'rgb(188, 255, 37)',
		border: 'solid 1px',

		boxSizing: 'border-box',
	};

	// Расход
	const total_cost_style: CSS.Properties = {
		position: 'absolute',
		top: '50%',
		height: `${costs}px`,

		backgroundColor: 'red',
		width: '20px',

		border: 'solid 1px',

		boxSizing: 'border-box',
	};

	const hanlders: { [s: string]: () => void } = {
		updateOrder: () => {
			if (store.stores != null) {
				store.stores.order = store.order;
				console.log('asd');
			}
		},
	};
	return (
		<div style={container_style} onClick={hanlders.updateOrder}>
			<div style={revenue_style}></div>
			<div style={total_cost_style}></div>
			<div style={profit_style}></div>
		</div>
	);
});

interface IncomeBarControlProps {
	stores: IncomeBarStores;
}

// TODO Написать на гридах
export const IncomeBarControl: FC<IncomeBarControlProps> = observer(({ stores: stores }) => {
	const current_store = stores.stores[stores.order];
	const { revenue, costs } = { ...current_store };

	const styles: { [s: string]: CSS.Properties } = {
		container_style: {
			width: '300px',
			height: '200px',
			// display: 'flex',
			// justifyContent: 'space-between',
		},
		item: {
			display: 'flex',
			justifyContent: 'space-between',
		},
	};

	const refs: { [s: string]: React.RefObject<HTMLInputElement> } = {
		revenue: createRef<HTMLInputElement>(),
		costs: createRef<HTMLInputElement>(),
	};

	const applies: { [s: string]: () => void } = {
		revenue: () => {
			current_store.revenue = Number(refs.revenue.current?.value);
		},
		costs: () => {
			current_store.costs = Number(refs.costs.current?.value);
		},
	};

	return (
		<div style={styles.container}>
			<div style={styles.item}>
				<div>Доход: {revenue} руб.</div>
				<input style={{ width: '50px' }} ref={refs.revenue}></input>
				<button onClick={applies.revenue}>apply</button>
			</div>

			<div style={styles.item}>
				<div>Расход: {costs} руб</div>
				<input style={{ width: '50px' }} ref={refs.costs}></input>
				<button onClick={applies.costs}>apply</button>
			</div>

			<div style={styles.item}>
				<div>Прибыль: {revenue - costs} руб.</div>
			</div>
		</div>
	);
});

interface IncomeBarControlsProps {
	stores: IncomeBarStores;
}

export const IncomeBars: FC<IncomeBarControlsProps> = observer(({ stores }) => {
	const order = stores.order;

	// const hanlders: { [s: string]: () => void } = {}

	return (
		<div style={{ display: 'flex', gap: '10px' }}>
			{stores.stores.map((s) => (
				<IncomeBar store={s}></IncomeBar>
			))}
		</div>
	);
});
