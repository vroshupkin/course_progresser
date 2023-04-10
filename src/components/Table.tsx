import { mergeObjects, TObject } from '../common/merge_json';
import { IStyleDictionary } from '../common/layout_tools';
import { createUseStyles } from 'react-jss';
import { observer } from 'mobx-react-lite';
import CSS from 'csstype';

import {
	createRef,
	CSSProperties,
	FC,
	SyntheticEvent,
	useEffect,
	useId,
	useRef,
	useState,
} from 'react';
import { observable, makeObservable, computed } from 'mobx';
import { JsxElement } from 'typescript';

export class TableStore 
{
  @observable public data: (string | number)[][];

  constructor(data: (string | number)[][]) 
  {
  	this.data = data;
  	makeObservable(this);
  }
}

interface ITableProps {
  store: TableStore;
}

export const Table: FC<ITableProps> = observer(({ store }) => 
{
	const generate_column_template = (len: number): string => 
	{
		let str = '';
		let i = 0;
		while (i != len) 
		{
			str += '1fr ';
			i++;
		}

		str = str.slice(0, str.length - 1) + ';';

		return str;
	};

	const classes = createUseStyles({
		header: {
			fontSize: '16px',
			fontWeight: 'bold',
		},
		row: (props) => ({
			display: 'grid',
			gridTemplateColumns: generate_column_template(store.data[0].length),
			'& div': {
				border: '1px solid #959595',
				height: '22px',
				textAlign: 'center',
				background: '#cdf4ff',
			},
		}),
		rowHighlight: {
			'&& div': {
				background: '#fffde5',
			},
		},
	})();

	const Header = (): JSX.Element => (
		<div className={`${classes.header} ${classes.row}`}>
			{store.data[0].map((v) => (
				<div>{v}</div>
			))}
		</div>
	);

	const mouse_over_block: React.MouseEventHandler<HTMLDivElement> = (e) => 
	{
		e.currentTarget.style.backgroundColor = '#fff';
	};

	const mouse_leave_block: React.MouseEventHandler<HTMLDivElement> = (e) => 
	{
		e.currentTarget.style.backgroundColor = '';
	};

	const mouse_over_row: React.MouseEventHandler<HTMLDivElement> = (e) => 
	{
		// e.currentTarget.style.backgroundColor = '#dff0ff';
		console.log(classes.rowHighlight);
		e.currentTarget.classList.add(`${classes.rowHighlight}`);

		// e.currentTarget.classList.forEach((v) => console.log(v));

		// console.log(window.getComputedStyle(e.currentTarget));
	};

	const mouse_leave_row: React.MouseEventHandler<HTMLDivElement> = (e) => 
	{
		e.currentTarget.classList.remove(classes.rowHighlight);
	};

	const Rows = (): JSX.Element => 
	{
		const rows = store.data.slice(1).map((row, y) => (
			<div
				className={classes.row}
				key={y}
				onMouseOver={mouse_over_row}
				onMouseLeave={mouse_leave_row}
			>
				{row.map((block, x) => (
					<div
						key={x}
						onMouseOver={mouse_over_block}
						onMouseLeave={mouse_leave_block}
					>
						{block}{' '}
					</div>
				))}
			</div>
		));
	
		return <>{rows}</>;
	};

	return (
		<>
			<Header></Header>
			<Rows></Rows>
		</>
	);
});
