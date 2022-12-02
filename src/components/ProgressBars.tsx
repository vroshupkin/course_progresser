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
				<ProgressBar2 store={store} />
				<ProgressBar2 store={store} />
				<ProgressBar2 store={store} />
			</div>

			<ProgressBarPlusMinus store={store} />
		</>
	);
});

export class StoreManyProgressBar {
	public stores: ProgressBarStore[];
	constructor() {
		this.stores = [];
		makeObservable(this, {
			stores: observable,
			procents: action,
		});
	}

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

	public procents(): number {
		let procents = 0;
		for (const store of this.stores) {
			procents += store.procents;
		}
		return procents / this.stores.length;
	}
}

interface IProgressArrayProps {
	store: StoreManyProgressBar;
}
export const ProgressArray: FC<IProgressArrayProps> = observer(({ store }) => {
	const countingStores = 3;
	if (store.stores.length === 0) {
		store.createStore(countingStores);
	}
	console.log(store.procents());
	console.log(store.stores[0].procents);

	return (
		<>
			{store.stores.map((store, i) => (
				<ProgressBar2 key={i} store={store}></ProgressBar2>
			))}
			<div>{store.procents()}</div>
		</>
	);
});

export class ProgressBarStore {
	constructor(public procents: number) {
		makeObservable(this, {
			procents: observable,
			changeProcents: action,
		});
	}

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
 * 1. Если 100% - зеленый. 1-99 желтый, 0 красный
 *
 */

export const ProgressBarDiv: FC<IProgressBar_Div> = ({ children, completeProgress, store }) => {
	const [isDrag, setIsDrag] = useState<boolean>(false);

	const cursor = new Cursor(0);

	const totalWidth = 300;
	const cursorSize = 14; // размер курсора в px

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

class RefDiv {
	constructor(public div: React.RefObject<HTMLDivElement>) {}

	changeWidth(width: number): void {
		if (this.div.current) {
			this.div.current.style.width = width + 'px';
		}
	}
}

const ProgressBar2: FC<IProgressBarStore> = observer(({ store, children }) => {
	const containerWidth = 300;
	const leftPaddingWidth = 5;
	const containerHeight = 40;

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
		},
		right: {
			width: containerWidth / 2 + 'px',
			background: 'yellow',
			border: '2px solid rgb(161 204 255)',
			borderRadius: '7px',
		},
		leftPadding: {
			width: leftPaddingWidth + 'px',
		},
	};

	const leftDiv = useRef<HTMLDivElement>(null);
	const rightDiv = useRef<HTMLDivElement>(null);
	const leftRefDiv = new RefDiv(leftDiv);
	const rightRefDiv = new RefDiv(rightDiv);

	const [clickState, setClickState] = useState(false);

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

			x = x > 300 ? 300 : x;
			x = x < 0 ? 0 : x;

			// console.log(`x: ${x}, e.clientX: ${e.clientX}`);

			leftRefDiv.changeWidth(x);
			rightRefDiv.changeWidth(300 - x);
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
