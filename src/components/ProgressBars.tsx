import React, { FC, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { observable, makeObservable, computed, action } from 'mobx';
import CSS from 'csstype';
import { Debagger } from '../common/debbager';
import { relative } from 'node:path/win32';
import { ProgressBarStore, StoreManyProgressBar } from './stores/ProgressBar.store';

interface IProgressBarProps {
	children: string;
	store: ProgressBarStore;
}
// export const ProgressBar: FC<IProgressBarProps> = observer(({ children, store }) => {
// 	return (
// 		<>
// 			<div>
// 				{children}: {Math.floor(store.procents) + '%'}
// 			</div>
// 			<ProgressBarDiv store={store} />
// 			<div style={{ display: 'flex' }}>
// 				<ProgressBar2 store={store} containerWidth={100} />
// 				<ProgressBar2 store={store} containerWidth={100} />
// 				<ProgressBar2 store={store} containerWidth={100} />
// 			</div>
// 		</>
// 	);
// });

interface IProgressArrayProps {
	store: StoreManyProgressBar;
}

import { step_10 as purpleSchoolStep } from '../data/purpleSchoolNodeJS';
import { Div } from '../common/htmlRef';

export const ProgressArray: FC<IProgressArrayProps> = observer(({ store }) => 
{
  const countingStores = 3;

  const styles: { [s: string]: CSS.Properties } = {
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    innerContainer: {
      display: 'flex',
    },
  };

  const viewNumberProcents = (procent: number): string => 
  {
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

interface IProgressBar_Div {
	children?: any;
	completeProgress?: number;
	store: ProgressBarStore;
}

class Cursor 
{
  constructor(private x: number) 
  {}

  update_x(num: number): void 
  {
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

export const ProgressBarDiv: FC<IProgressBar_Div> = ({ children, completeProgress, store }) => 
{
  const [isDrag, setIsDrag] = useState<boolean>(false);

  // const cursor = new Cursor(0);

  const totalWidth = 300;
  const cursorSize = 14; // размер курсора в px

  const completeDivRef = useRef<HTMLDivElement>(null);
  const restDivRef = useRef<HTMLDivElement>(null);
  const indexDivRef = useRef<HTMLDivElement>(null);

  const changeDivWidth = (divRef: React.RefObject<HTMLDivElement>, width: number): void => 
  {
    if (divRef.current) 
    {
      divRef.current.style.width = width + 'px';
    }
  };

  const changeCursorPosition = (divRef: React.RefObject<HTMLDivElement>, width: number): void => 
  {
    if (divRef.current) 
    {
      divRef.current.style.left = width + cursorSize / 2 + 'px';
    }
  };

  const calcPercent = (leftOffset: number): number => 
  {
    leftOffset -= cursorSize / 2;
    return Math.floor(100 * leftOffset) / totalWidth;
  };

  const completeWidth = (totalWidth * store.procents) / 100;
  const restWidth = totalWidth - completeWidth;
  changeDivWidth(completeDivRef, completeWidth);
  changeDivWidth(restDivRef, restWidth);
  changeCursorPosition(indexDivRef, completeWidth);

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

  const containerMouseMove = (e: React.MouseEvent): void => 
  {
    if (e.type === 'mouseleave' || e.type === 'mouseup' || e.type === 'mousedown') 
    {
      setIsDrag(false);
    }
    else if (e.type === 'mousemove' && isDrag) 
    {
      if (e.clientX <= 300 + cursorSize / 2 && e.clientX >= -cursorSize / 2) 
      {
        store.changeProcents(calcPercent(e.clientX));
      }
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
          onMouseDown={(e): void => 
          {
            setIsDrag(true);
            // console.log(e.type);
          }}
          onMouseUp={(e): void => 
          {
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

const ProgressBarPlusMinus: FC<IProgressBarStore> = observer(({ store }) => 
{
  return (
    <div>
      <button
        onClick={(e): void => 
        {
          store.changeProcents(store.procents + 1);
        }}
        children={'plus'}
      />
      <button
        onClick={(e): void => 
        {
          store.changeProcents(store.procents - 1);
        }}
        children={'minus'}
      />
    </div>
  );
});

const ProgressBar2: FC<IProgressBarStore> = observer(({ store, children, containerWidth }) => 
{
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

  const setProcentsInStore = (xPosition: number): void => 
  {
    let procents = (100 * xPosition) / containerWidth;
    procents = procents > 99 ? 100 : Math.floor(procents);

    store.changeProcents(procents);
  };

  const mouseHandler = (e: React.MouseEvent): void => 
  {
    const pageOffsetX = e.currentTarget.getBoundingClientRect().left;
    let x = e.clientX - leftPaddingWidth - pageOffsetX;

    if (x <= 0) 
    {
      setClickState(false);
    }
    if (e.type === 'mousedown' || (e.type === 'mousemove' && clickState)) 
    {
      x = x > containerWidth ? containerWidth : x;
      x = x < 0 ? 0 : x;

      leftRefDiv.changeWidth(x);
      rightRefDiv.changeWidth(containerWidth - x);

      setProcentsInStore(x);
    }

    if (e.type === 'mousedown') 
    {
      setClickState(true);
    }

    if (e.type === 'mouseleave' || e.type === 'mouseup') 
    {
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
