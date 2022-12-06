import { Dictionary } from './common/dictionary.interface.';
import { MobxComponent, MobxTimer } from './components/MobxTimer';
import {
	ProgressArray,
	ProgressBar,
	ProgressBarStore,
	StoreManyProgressBar,
} from './components/ProgressBars';
import { StepCard, VideoCard } from './components/StepCard';
import { ProcentStore } from './components/stores/ProcentStore';
import { course_10_name, step_10 } from './data/purpleSchoolNodeJS';
import CSS from 'csstype';

const progressBarStore = new ProgressBarStore(50);
const progressArrayStore = new StoreManyProgressBar();

const procentStore = new ProcentStore(0, 0, 18.18);

function App() {
	return (
		<>
			<div>
				<MobxComponent />
				<ProgressArray store={progressArrayStore}></ProgressArray>
			</div>

			<StepCard
				stepName={course_10_name[0] + '. ' + course_10_name[1]}
				stepCourseObject={step_10}
			></StepCard>
		</>
	);
}

export default App;
