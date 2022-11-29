import React, { FC, useEffect, useRef, useState } from 'react';
import CSS from 'csstype';

interface IProgressBarProps {
	children: string;
}

export const ProgressBar: FC<IProgressBarProps> = ({ children }) => {
	const [state, setState] = useState(0);

	useEffect(() => {
		console.log(state);
	}, [state]);

	const buttonHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
		setState(state + 1);
		console.log(e);
	};
	return (
		<>
			<button onClick={buttonHandler}>add</button>
			<div>
				{children}: {state}
			</div>
			<ProgressBarDiv>_</ProgressBarDiv>
		</>
	);
};

interface IProgressBar_Div {
	children?: any;
	completeProgress?: number;
}

/**
 *
 * 1. Если 100% - зеленый. 1-99 желтый, 0 красный
 *
 */

// type voidFunc = (): void => ;

export const ProgressBarDiv: FC<IProgressBar_Div> = ({ children, completeProgress }) => {
	const [isDrag, setIsDrag] = useState<boolean>(false);

	const totalWidth = 300;

	const [percent, setPercent] = useState(50);
	// useEffect(() => {}, [percent]);
	// let completeWidth = 150;
	// let divWidths.rest = 150;

	const divWidths = {
		complete: 150,
		rest: 150,
	};

	const completeDivRef = useRef<HTMLDivElement>(null);
	const restDivRef = useRef<HTMLDivElement>(null);
	const indexDivRef = useRef<HTMLDivElement>(null);

	const changeDivWidth = (divRef: React.RefObject<HTMLDivElement>, width: number): void => {
		if (divRef.current) {
			divRef.current.style.width = width + 'px';
		}
	};

	const changeDivLeft = (divRef: React.RefObject<HTMLDivElement>, width: number): void => {
		if (divRef.current) {
			divRef.current.style.left = width + 'px';
		}
	};

	const calcPercent = (leftOffset: number): number => {
		return 100 - (100 * (totalWidth - leftOffset)) / totalWidth;
	};

	useEffect(() => {
		const completeWidth = (totalWidth * percent) / 100;
		const restWidth = totalWidth - completeWidth;
		console.log(percent + '%');
		// console.log(completeWidth);

		console.log(completeDivRef.current?.style.width);
		console.log(restDivRef.current?.style.width);

		changeDivWidth(completeDivRef, completeWidth);
		changeDivWidth(restDivRef, restWidth);
		changeDivLeft(indexDivRef, completeWidth);
	}, [percent]);

	const styles: { [s: string]: CSS.Properties } = {
		container: {
			position: 'relative',
			display: 'flex',
			height: '30px',
		},
		completeDiv: {
			width: `${totalWidth / 2}px`,
			background: 'yellow',
		},
		restDiv: {
			width: `${totalWidth / 2}px`,
			background: 'gray',
		},
		index: {
			position: 'absolute',
			background: 'red',
			top: '0px',
			cursor: 'grab',
		},
	};

	const indexGrabberHandler = (e: React.MouseEvent): void => {
		console.log(e.type);
	};

	const containerMouseMove = (e: React.MouseEvent): void => {
		if (e.type === 'mouseleave' || e.type === 'mouseup' || e.type === 'mousedown') {
			console.log(e.type);

			setIsDrag(false);
		} else if (e.type === 'mousemove' && isDrag) {
			// console.log(e.movementX);
			// console.log(e.clientX);

			console.log();
			setPercent(calcPercent(e.clientX));

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
					style={styles.index}
					ref={indexDivRef}
					onMouseDown={(e) => {
						setIsDrag(true);
						console.log(e.type);
					}}
					onMouseUp={(e) => {
						setIsDrag(false);
						console.log(e.type);
					}}
					children={children}
				/>

				<div style={styles.completeDiv} ref={completeDivRef}>
					{children}
				</div>
				<div style={styles.restDiv} ref={restDivRef}>
					{children}
				</div>
			</div>
			<div>
				<button onClick={(e) => setPercent(percent + 1)} children={'plus'} />
				<button onClick={(e) => setPercent(percent - 1)} children={'minus'} />
			</div>
		</>
	);
};
