import { Dictionary } from './common/dictionary.interface.';
import { MobxComponent, MobxTimer } from './components/MobxTimer';
import { ProgressArray } from './components/ProgressBars';

import { ProgressBarStore, StoreManyProgressBar } from './components/stores/ProgressBar.store';
import { load } from 'webfontloader';
import { StepCard, VideoCard } from './components/StepCard';
import { ProcentStore } from './components/stores/ProcentStore.store';
import { course_10_name, step_10 } from './data/purpleSchoolNodeJS';
import CSS from 'csstype';
import { IncomeBar, IncomeBarControl, IncomeBars } from './components/IncomeBar';
import { IncomeBarStore, IncomeBarStores } from './components/stores/IncomeBar.store';
import { useEffect } from 'react';
import { createUseStyles } from 'react-jss';

const income_bar_store = new IncomeBarStore(100, 80);

const income_bar_stores: IncomeBarStores = new IncomeBarStores(
	[
		new IncomeBarStore(100, 80),
		new IncomeBarStore(70, 50),
		new IncomeBarStore(55, 45),
		new IncomeBarStore(99, 12),
		new IncomeBarStore(64, 55),
		new IncomeBarStore(60, 2),
		new IncomeBarStore(60, 60),
	],
	0,
);

let i = 0;
for (const store of income_bar_stores.stores) {
	store.stores = income_bar_stores;
	store.order = i;
	// console.log(store.stores);
	i++;
}

export default function App(): JSX.Element {
	const classes = createUseStyles({
		main_font: {
			'& *': {
				fontFamily: 'Anonymous Pro',
				fontSize: '14px',
			},
		},
	})();

	useEffect(() => {
		load({
			google: {
				families: ['Anonymous Pro'],
			},
		});
	}, []);
	return (
		<>
			<div className={classes.main_font}>
				<IncomeBars stores={income_bar_stores}></IncomeBars>
				<IncomeBarControl stores={income_bar_stores}></IncomeBarControl>
			</div>
		</>
	);
}
