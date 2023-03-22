import { observer } from 'mobx-react-lite';
import CSS from 'csstype';
import { createRef, CSSProperties, FC, SyntheticEvent, useRef, useState } from 'react';
import { IncomeBarStore, IncomeBarStores } from './stores/IncomeBar.store';
import { mergeObjects, TObject } from '../common/merge_json';
import { IStyleDictionary } from '../common/layout_tools';

interface IncomeBarProps {
	store: IncomeBarStore;
}

export const IncomeBar: FC<IncomeBarProps> = observer(({ store }) => {
	const [isHover, setIsHover] = useState(false);

	const { revenue, costs } = { ...store };

	const styles: IStyleDictionary = {
		container: {
			position: 'relative',
			height: '220px',
			width: '40px',
			boxSizing: 'border-box',
		},
		profit: {
			position: 'absolute',
			bottom: '50%',
			margin: '0 4px',
			height: `${revenue - costs}px`,

			width: '12px',

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

	const onHoverStyle: CSSProperties = {
		border: 'solid 3px #ac9600',
		padding: '0px 5px',
	};

	const mixinContainer: CSSProperties[] = [
		isHover == true ? onHoverStyle : {},
		store.order == store.stores?.order_select ? selectStyle : {},
	];

	const profitStyle: CSSProperties = {
		height: `${Math.abs(revenue - costs)}px`,
	};
	if (revenue > costs) {
		profitStyle['bottom'] = `50%`;
	} else {
		profitStyle['top'] = `50%`;
	}

	styles.container = mergeObjects(styles.container, ...mixinContainer);
	styles.profit = mergeObjects(styles['profit'], profitStyle);

	const hanlders: { [s: string]: (e?: any) => void } = {
		updateOrder: () => {
			if (store.stores != null) {
				store.stores.order_select = store.order;
			}
		},

		mouseOver: (e: React.MouseEventHandler<HTMLDivElement>) => {
			console.log(isHover);

			setIsHover(true);
		},
		mouseOut: (e: React.MouseEventHandler<HTMLDivElement>) => {
			console.log(isHover);
			setIsHover(false);
		},
	};
	return (
		<div
			style={styles.container}
			onClick={hanlders.updateOrder}
			onMouseOver={hanlders.mouseOver}
			onMouseOut={hanlders.mouseOut}
		>
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

	const styles: IStyleDictionary = {
		container: {
			width: '300px',
			height: '200px',
		},
		item: {
			display: 'flex',
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

	const styles: IStyleDictionary = {
		container: {
			display: 'flex',
		},
	};

	return (
		<div style={styles.container}>
			{stores.stores.map((s) => (
				<IncomeBar store={s}></IncomeBar>
			))}
		</div>
	);
});
