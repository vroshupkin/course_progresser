import React, { FC, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { observable, makeObservable, computed, action } from 'mobx';
import CSS from 'csstype';
import { Debagger } from '../common/debbager';
import { relative } from 'node:path/win32';

interface IProgressBarProps {
	children: string;
	store: ProgressBarStore;
}
export const ProgressBar: FC<IProgressBarProps> = observer(({ children, store }) => {
	return (
		<>
			<div>
				{children}: {Math.floor(store.procents) + '%'}
			</div>
			<ProgressBarDiv store={store} />
			<div style={{ display: 'flex' }}>
				<ProgressBar2 store={store} containerWidth={100} />
				<ProgressBar2 store={store} containerWidth={100} />
				<ProgressBar2 store={store} containerWidth={100} />
			</div>

			{/* <ProgressBarPlusMinus store={store} /> */}
		</>
	);
});

export class StoreManyProgressBar {
	@observable public stores: ProgressBarStore[];

	constructor() {
		this.stores = [];
		makeObservable(this);
	}

	@action
	public addStore(s: ProgressBarStore | ProgressBarStore[]): void {
		if (Array.isArray(s)) {
			for (const store of s) {
				this.stores.push(store);
			}
		} else {
			this.stores.push(s);
		}
	}

	public createStore(n: number): void {
		for (let i = 0; i < n; i++) {
			this.stores.push(new ProgressBarStore(50));
		}
	}

	@computed
	public get procents(): number {
		let procents = 0;
		for (const store of this.stores) {
			procents += store.procents;
		}

		return Math.floor(procents / this.stores.length);
	}
}

interface IProgressArrayProps {
	store: StoreManyProgressBar;
}

import { step_10 as purpleSchoolStep } from '../data/purpleSchoolNodeJS';
import { Div } from '../common/htmlRef';

export const ProgressArray: FC<IProgressArrayProps> = observer(({ store }) => {
	const countingStores = 3;
	if (store.stores.length === 0) {
		store.createStore(countingStores);
	}

	// console.log(purpleSchoolStep);

	const styles: { [s: string]: CSS.Properties } = {
		container: {
			display: 'flex',
			flexDirection: 'column',
		},
		innerContainer: {
			display: 'flex',
		},
	};

	const viewNumberProcents = (procent: number): string => {
		const addSpace = 3 - `${procent}`.length;
		// console.log(' '.repeat(addSpace) + procent);

		return procent + '\xA0'.repeat(addSpace);
	};

	return (
		<div style={styles.container}>
			{store.stores.map((s, i) => (
				<div style={styles.innerContainer}>
					<div style={{ width: '200px' }}>{purpleSchoolStep[i][2]}</div>
					<ProgressBar2 key={i} store={s} containerWidth={120}></ProgressBar2>
				</div>
			))}
			<div>{store.procents}</div>
		</div>
	);
});

export class ProgressBarStore {
	@observable
	public procents: number;

	constructor(procents: number) {
		this.procents = procents;

		makeObservable(this);
	}

	@action
	changeProcents(procents: number): void {
		this.procents = procents;
	}

	// get value(val: number){

	// }
}

interface IProgressBar_Div {
	children?: any;
	completeProgress?: number;
	store: ProgressBarStore;
}

class Cursor {
	constructor(private x: number) {}

	update_x(num: number) {
		this.x = num;
		console.log('cursor update', this.x);
	}
	// set x(num: number) {
	// 	return num;
	// }
}
/**
 *
 * 1. ???????? 100% - ??????????????. 1-99 ????????????, 0 ??????????????
 *
 */

export const ProgressBarDiv: FC<IProgressBar_Div> = ({ children, completeProgress, store }) => {
	const [isDrag, setIsDrag] = useState<boolean>(false);

	const cursor = new Cursor(0);

	const totalWidth = 300;
	const cursorSize = 14; // ???????????? ?????????????? ?? px

	// const [percent, setPercent] = useState(50);

	// useEffect(() => {}, [percent]);
	// let completeWidth = 150;
	// let divWidths.rest = 150;

	// const divWidths = {
	// 	complete: 150,
	// 	rest: 150,
	// };

	const completeDivRef = useRef<HTMLDivElement>(null);
	const restDivRef = useRef<HTMLDivElement>(null);
	const indexDivRef = useRef<HTMLDivElement>(null);

	const changeDivWidth = (divRef: React.RefObject<HTMLDivElement>, width: number): void => {
		if (divRef.current) {
			divRef.current.style.width = width + 'px';
		}
	};

	const changeCursorPosition = (divRef: React.RefObject<HTMLDivElement>, width: number): void => {
		if (divRef.current) {
			divRef.current.style.left = width + cursorSize / 2 + 'px';
		}
	};

	//
	const calcPercent = (leftOffset: number): number => {
		leftOffset -= cursorSize / 2;
		return Math.floor(100 * leftOffset) / totalWidth;
	};

	const completeWidth = (totalWidth * store.procents) / 100;
	const restWidth = totalWidth - completeWidth;
	changeDivWidth(completeDivRef, completeWidth);
	changeDivWidth(restDivRef, restWidth);
	changeCursorPosition(indexDivRef, completeWidth);

	// useEffect(() => {
	// 	const completeWidth = (totalWidth * percent) / 100;
	// 	const restWidth = totalWidth - completeWidth;
	// 	// console.log(percent + '%');
	// 	// console.log(completeWidth);

	// 	// console.log(completeDivRef.current?.style.width);
	// 	// console.log(restDivRef.current?.style.width);
	// 	cursor.update_x(percent);

	// }, [percent]);

	const styles: { [s: string]: CSS.Properties } = {
		container: {
			position: 'relative',
			display: 'flex',
			height: '30px',
			width: `${totalWidth}px`,
			paddingLeft: cursorSize + 'px',
			userSelect: 'none',
		},
		completeDiv: {
			width: `${totalWidth / 2}px`,
			background: 'yellow',
		},
		restDiv: {
			width: `${totalWidth / 2}px`,
			background: 'gray',
		},
		cursor: {
			position: 'absolute',
			background: 'red',
			top: '0px',
			cursor: 'grab',
			width: `${cursorSize}px`,
		},
	};

	const containerMouseMove = (e: React.MouseEvent): void => {
		if (e.type === 'mouseleave' || e.type === 'mouseup' || e.type === 'mousedown') {
			setIsDrag(false);
		} else if (e.type === 'mousemove' && isDrag) {
			// console.log(e.movementX);
			// console.log(e.clientX);

			console.log(e.clientX);
			if (e.clientX <= 300 + cursorSize / 2 && e.clientX >= -cursorSize / 2) {
				// setPercent();

				store.changeProcents(calcPercent(e.clientX));
			}

			// console.log('hello');
		}

		return;
	};

	return (
		<>
			<div
				style={styles.container}
				onMouseMove={containerMouseMove}
				onMouseLeave={containerMouseMove}
				onMouseUp={containerMouseMove}
			>
				<div
					style={styles.cursor}
					ref={indexDivRef}
					onMouseDown={(e) => {
						setIsDrag(true);
						// console.log(e.type);
					}}
					onMouseUp={(e) => {
						setIsDrag(false);
						// console.log(e.type);
					}}
				>
					&nbsp;
				</div>

				<div style={styles.completeDiv} ref={completeDivRef}>
					&nbsp;
				</div>
				<div style={styles.restDiv} ref={restDivRef}>
					&nbsp;
				</div>
			</div>
		</>
	);
};

interface IProgressBarStore {
	store: ProgressBarStore;
	children?: React.ReactNode;
	containerWidth: number;
}

const ProgressBarPlusMinus: FC<IProgressBarStore> = observer(({ store }) => {
	return (
		<div>
			<button
				onClick={(e) => {
					store.changeProcents(store.procents + 1);
				}}
				children={'plus'}
			/>
			<button
				onClick={(e) => {
					store.changeProcents(store.procents - 1);
				}}
				children={'minus'}
			/>
		</div>
	);
});

const ProgressBar2: FC<IProgressBarStore> = observer(({ store, children, containerWidth }) => {
	// const containerWidth = 300;
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

	const [clickState, setClickState] = useState(false);

	const setProcentsInStore = (xPosition: number): void => {
		let procents = (100 * xPosition) / containerWidth;
		procents = procents > 99 ? 100 : Math.floor(procents);

		store.changeProcents(procents);
	};

	const mouseHandler = (e: React.MouseEvent) => {
		// console.log(e.type);
		// console.log(e.nativeEvent.offsetX);

		// console.log(e);
		// console.log(e.currentTarget);
		const pageOffsetX = e.currentTarget.getBoundingClientRect().left;
		// console.log(pageOffsetX);
		let x = e.clientX - leftPaddingWidth - pageOffsetX;

		if (x <= 0) {
			setClickState(false);
		}
		if (e.type === 'mousedown' || (e.type === 'mousemove' && clickState)) {
			// console.log(e.clientX);

			x = x > containerWidth ? containerWidth : x;
			x = x < 0 ? 0 : x;

			// console.log(`x: ${x}, e.clientX: ${e.clientX}`);

			leftRefDiv.changeWidth(x);
			rightRefDiv.changeWidth(containerWidth - x);

			// console.log(x);

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
			{children}
		</div>
	);
});
