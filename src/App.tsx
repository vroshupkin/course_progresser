import { MobxComponent, MobxTimer } from './components/MobxTimer';
import {
	ProgressArray,
	ProgressBar,
	ProgressBarStore,
	StoreManyProgressBar,
} from './components/ProgressBars';

const progressBarStore = new ProgressBarStore(50);
const progressArrayStore = new StoreManyProgressBar();

function App() {
	return (
		<div>
			<ProgressBar children={'asd'} store={progressBarStore} />
			<MobxTimer />
			<MobxComponent />
			<ProgressArray store={progressArrayStore}></ProgressArray>
		</div>
	);
}

function hello(): void {
	console.log('hello');
}
export default App;
