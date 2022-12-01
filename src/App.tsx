import { MobxComponent, MobxTimer } from './components/MobxTimer';
import { ProgressBar, ProgressBarStore } from './components/ProgressBars';

const progressBarStore = new ProgressBarStore(50);

function App() {
	return (
		<div>
			<ProgressBar children={'asd'} store={progressBarStore} />
			<MobxTimer />
			<MobxComponent />
		</div>
	);
}

function hello(): void {
	console.log('hello');
}
export default App;
