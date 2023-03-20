import { Dictionary } from './common/dictionary.interface.';
import { MobxComponent, MobxTimer } from './components/MobxTimer';
import { ProgressArray } from './components/ProgressBars';

import { ProgressBarStore, StoreManyProgressBar } from './components/stores/ProgressBar.store';

import { StepCard, VideoCard } from './components/StepCard';
import { ProcentStore } from './components/stores/ProcentStore.store';
import { course_10_name, step_10 } from './data/purpleSchoolNodeJS';
import CSS from 'csstype';
import { IncomeBar, IncomeBarControl, IncomeBars } from './components/IncomeBar';
import { IncomeBarStore, IncomeBarStores } from './components/stores/IncomeBar.store';

const income_bar_store = new IncomeBarStore(100, 80);

const income_bar_stores: IncomeBarStores = new IncomeBarStores(
	[new IncomeBarStore(100, 80, 0), new IncomeBarStore(30, 50, 1), new IncomeBarStore(18, 55, 2)],
	0,
);

for (const store of income_bar_stores.stores) {
	store.stores = income_bar_stores;
	// console.log(store.stores);
}

export default function App(): JSX.Element {
	return (
		<>
			<div>
				<IncomeBars stores={income_bar_stores}></IncomeBars>
				<IncomeBarControl stores={income_bar_stores}></IncomeBarControl>
			</div>
		</>
	);
}
