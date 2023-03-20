import { action, computed, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { FC, useRef, useState } from 'react';
import { ProcentStore } from './stores/ProcentStore.store';
import CSS from 'csstype';
import { Div } from '../common/htmlRef';
import { viewNumber } from '../common/number';
import { Dictionary } from '../common/dictionary.interface.';
import { Procent } from '../common/procent';
import { step_10, TCourseVideosTuple } from '../data/purpleSchoolNodeJS';

class StepCardStore {
	constructor() {
		return;
	}
}

interface IStepCard {
	stepName: string;
	stepCourseObject: TCourseVideosTuple[];
}

const StepCardName: FC<{ name: string }> = ({ name }) => {
	const styles: Dictionary<CSS.Properties> = {
		div: {
			fontSize: '30px',
			marginBottom: '15px',
		},
	};
	return <div style={styles.div}>{name}</div>;
};

export const StepCard: FC<IStepCard> = ({ stepName, stepCourseObject }) => {
	const styles: Dictionary<CSS.Properties> = {
		stepCard: {
			display: 'flex',
			width: '70%',
			flexWrap: 'wrap',
			gap: '5px',
		},
		container: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},
	};

	return (
		<div style={styles.container}>
			<StepCardName name={stepName}></StepCardName>
			<div style={styles.stepCard}>
				{stepCourseObject.map((arr, ind) => {
					const max = arr[2];
					const name = arr[0] + ' ' + arr[1];

					const store = new ProcentStore(0, 0, max);

					return <VideoCard key={ind} store={store} name={name} />;
				})}
			</div>
		</div>
	);
};

const VideoCardName: FC<{ name: string }> = ({ name }) => {
	const style: CSS.Properties = {
		width: '200px',
		height: '40px',
		textAlign: 'center',
	};

	return <div style={style}>{name}</div>;
};

interface IVideoCard {
	store: ProcentStore;
	name: string;
}
export const VideoCard: FC<IVideoCard> = observer(({ store, name }) => {
	const otherBorderStyle = 'solid 3px #9e9e9e';

	const styles: Dictionary<CSS.Properties> = {
		container: {
			borderColor: 'green',
			borderRadius: '7px',
			borderTop: 'solid 7px green',
			borderRight: otherBorderStyle,
			borderLeft: otherBorderStyle,
			borderBottom: otherBorderStyle,
			// marginRight: '7px',
		},
	};

	return (
		<div style={styles.container}>
			<VideoCardName name={name} />

			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<ProgressText store={store} />
			</div>
			<ProgressBar store={store} />
		</div>
	);
});

interface IProgressText {
	store: ProcentStore;
}

/**
 * 0.00 / 18.18         - 0 минут из 18.18
 */
export const ProgressText: FC<IProgressText> = observer(({ store }) => {
	const viewVal = (): string => {
		return viewNumber(store.getValue, 3);
	};

	const input = useRef<HTMLInputElement>(null);
	if (input.current) {
		input.current.value = viewVal();
	}

	const styles: Dictionary<CSS.Properties> = {
		input: {
			width: '45px',
		},
	};

	const inputOnChange = (e: React.FormEvent<HTMLInputElement>): void => {
		store.setValue(Number(e.currentTarget.value));
	};

	return (
		<div style={{ display: 'flex' }}>
			<input ref={input} onChange={inputOnChange} style={styles.input}></input>
			<div>/ {`${store.max}`}</div>
		</div>
	);
});

interface IProgressBarStore {
	store: ProcentStore;
	containerWidth?: number;
}

const ProgressBar: FC<IProgressBarStore> = observer(({ store, containerWidth = 200 }) => {
	const leftPaddingWidth = 5;
	const containerHeight = 20;

	const styles: { [s: string]: CSS.Properties } = {
		container: {
			display: 'flex',
			width: containerWidth + leftPaddingWidth + 'px',
			height: containerHeight + 'px',
			userSelect: 'none',
			position: 'relative',
		},
		left: {
			width: containerWidth / 2 + 'px',
			background: 'green',
			border: '2px solid rgb(161 204 255)',
			borderRadius: '7px',
			userSelect: 'none',
		},
		right: {
			width: containerWidth / 2 + 'px',
			background: 'yellow',
			border: '2px solid rgb(161 204 255)',
			borderRadius: '7px',
			userSelect: 'none',
		},
		leftPadding: {
			width: leftPaddingWidth + 'px',
		},
	};

	const leftDiv = useRef<HTMLDivElement>(null);
	const rightDiv = useRef<HTMLDivElement>(null);
	const leftRefDiv = new Div(leftDiv);
	const rightRefDiv = new Div(rightDiv);

	const leftWidth = Procent.getValue(store.getProcent, 0, containerWidth);

	leftRefDiv.changeWidth(leftWidth);
	rightRefDiv.changeWidth(containerWidth - leftWidth);

	const [clickState, setClickState] = useState(false);

	const setProcentsInStore = (xPosition: number): void => {
		store.setProcent(xPosition / containerWidth);
	};

	const mouseHandler = (e: React.MouseEvent): void => {
		const pageOffsetX = e.currentTarget.getBoundingClientRect().left;
		let x = e.clientX - leftPaddingWidth - pageOffsetX;

		if (x <= 0) {
			setClickState(false);
		}
		if (e.type === 'mousedown' || (e.type === 'mousemove' && clickState)) {
			x = x > containerWidth ? containerWidth : x;
			x = x < 0 ? 0 : x;

			setProcentsInStore(x);
		}

		if (e.type === 'mousedown') {
			setClickState(true);
		}

		if (e.type === 'mouseleave' || e.type === 'mouseup') {
			setClickState(false);
		}
	};

	return (
		<div
			style={styles.container}
			onMouseUp={mouseHandler}
			onMouseDown={mouseHandler}
			onMouseMove={mouseHandler}
			onMouseLeave={mouseHandler}
		>
			<div style={styles.leftPadding}></div>
			<div style={styles.left} ref={leftDiv}></div>
			<div style={styles.right} ref={rightDiv}></div>
		</div>
	);
});
