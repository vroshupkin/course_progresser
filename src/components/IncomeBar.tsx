import { observer } from 'mobx-react-lite';
import CSS from 'csstype';
import { createRef, CSSProperties, FC, useRef } from 'react';
import { IncomeBarStore, IncomeBarStores } from './stores/IncomeBar.store';

interface IncomeBarProps {
	store: IncomeBarStore;
}

export const IncomeBar: FC<IncomeBarProps> = observer(({ store }) => {
	const { revenue, costs } = { ...store };

	const styles: { [s: string]: CSSProperties } = {
		container: {
			position: 'relative',
			height: '200px',
			width: '20px',
		},
		profit: {
			position: 'absolute',
			bottom: '50%',

			height: `${revenue - costs}px`,
			right: '5px',

			width: '15px',
			backgroundColor: 'green',

			border: 'solid 1px',
			boxSizing: 'border-box',
		},
		revenue: {
			position: 'absolute',
			bottom: '50%',
			height: `${revenue}px`,

			backgroundColor: 'yellow',
			width: '20px',

			borderColor: 'rgb(188, 255, 37)',
			border: 'solid 1px',

			boxSizing: 'border-box',
		},

		total_cost: {
			position: 'absolute',
			top: '50%',
			height: `${costs}px`,

			backgroundColor: 'red',
			width: '20px',

			border: 'solid 1px',

			boxSizing: 'border-box',
		},
	};

	const selectStyle: CSSProperties = {
		border: 'solid 3px green',
		padding: '0px 5px',
	};
	if (store.order == store.stores?.order_select) {
		styles.container = { ...styles.container, ...selectStyle };
	}
	const hanlders: { [s: string]: () => void } = {
		updateOrder: () => {
			if (store.stores != null) {
				store.stores.order_select = store.order;
			}
		},
	};
	return (
		<div style={styles.container} onClick={hanlders.updateOrder}>
			<div style={styles.revenue}></div>
			<div style={styles.total_cost}></div>
			<div style={styles.profit}></div>
		</div>
	);
});

interface IncomeBarControlProps {
	stores: IncomeBarStores;
}

// TODO Написать на гридах
export const IncomeBarControl: FC<IncomeBarControlProps> = observer(({ stores: stores }) => {
	const current_store = stores.stores[stores.order_select];
	const { revenue, costs } = { ...current_store };

	const styles: { [s: string]: CSS.Properties } = {
		container: {
			width: '300px',
			height: '200px',
			// display: 'flex',
			// justifyContent: 'space-between',
		},
		item: {
			display: 'flex',
			// justifyContent: 'space-between',
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
	const order = stores.order_select;

	// const hanlders: { [s: string]: () => void } = {}

	return (
		<div style={{ display: 'flex', gap: '10px' }}>
			{stores.stores.map((s) => (
				<IncomeBar store={s}></IncomeBar>
			))}
		</div>
	);
});
