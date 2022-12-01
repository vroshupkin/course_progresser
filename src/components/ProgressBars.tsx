import React, { FC, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { observable, makeObservable, computed, action } from 'mobx';
import CSS from 'csstype';
import { Debagger } from '../common/debbager';

// const console = new Debagger(false);

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
			<ProgressBarPlusMinus store={store} />
		</>
	);
});

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

// type voidFunc = (): void => ;

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
}

export const ProgressBarPlusMinus: FC<IProgressBarStore> = observer(({ store }) => {
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
