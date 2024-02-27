import { Dispatch, createContext, useReducer } from 'react';

const ContextReducerInitState = { loading: false, data: undefined, tableData: [] };

type Row1 = {id: string, artist: string, check: string, album: string, excess_chars: string}


type TReducerContextState<ROW> = {
  loading: boolean,
  data: any,
  tableData: ROW[]
}
type TContextReducerActions<ROW> = 
{
  name: 'setData',
  data: any
} | 
{
  name: 'reset'
} | 
{
  name: 'setLoading',
  loading: boolean
} |
{
  name: 'pushRow',
  pushRow: ROW
}
   

export const ContextReducerState = createContext<TReducerContextState<Row1>>(ContextReducerInitState);
// eslint-disable-next-line 
export const ContextReducerDispatch = createContext<Dispatch<TContextReducerActions<Row1>> | null>(null);


export const TableReducer = (
  state: TReducerContextState<Row1>,
  action: TContextReducerActions<Row1>) => 
{
  switch (action.name)
  {
  case 'setData':
  {
    return{
      ...state,
      data: action.data,
      loading: false
    };
  }
  case 'setLoading':
  {
    return{
      ...state,
      loading: action.loading
    };
  }
  case 'reset':
  {
    return{
      ...state,
      loading: false
    };
  }
  case 'pushRow':
  { 
    const tableData = [ ...state.tableData, action.pushRow ];
 
    return{
      ...state,
      tableData

    };
  }
  }
};


// @ts-ignore
export const TableProvider = ({ children }) => 
{
  const [ state, dispatch ] = useReducer(TableReducer, ContextReducerInitState);
  
  
  return(
    // @ts-ignore
    <ContextReducerState.Provider value={state}>
      {/* @ts-ignore */}
      <ContextReducerDispatch.Provider value={dispatch}>
        {children}
      </ContextReducerDispatch.Provider>
    </ContextReducerState.Provider>

  );
};
