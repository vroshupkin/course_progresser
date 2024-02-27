
import React, { Dispatch, KeyboardEventHandler, Reducer, ReducerAction, createContext, useContext, useEffect, useReducer, useRef, useState } from 'react';
import { DiscogsApiBackend } from './Discogs.api';
import { stat } from 'node:fs';
import { checkVaidate } from '../../shared/checkValidateSymbol';
import { ContextReducerDispatch, ContextReducerState, TableProvider, TableReducer } from './Table.store';
import { TableRow, Th } from '../../widgets/Table';
import { HttpStatus } from '../../common/HTTPStatus';
import { timeout } from '../../common/test_time';
import { utf_mapper } from '../../shared/mappUtf';
import { Div } from '../../common/htmlRef';
import { act } from '@testing-library/react';

const TailwindStyles = 
{
  button: 'bg-[#666] hover:bg-[#888] rounded-md p-[10px] border-[#000] border-[1px] text-[#eee]'
};

function useAsyncReducer(reducer: any, initState: any) 
{
  const [ state, setState ] = useState(initState),
    dispatchState = async (action: any) => setState(await reducer(state, action));
  
  return [ state, dispatchState ];
}


const AsyncApiReducer = (api: (args: any) => Promise<any>) => async (state: any, action: any) => 
{
  switch(action.name)
  {
  case 'loading':
  {
    return {
      ...state,
      isLoading: true,
      data: '',
      error: ''
    };
  }
  
  case 'loaded':
  {
    return {
      ...state,
      isLoading: false
    };
  }

  case 'start_api':
  {
    let json;
    try
    {
      json = await api(action.args);
    }
    catch(e)
    {
      return{
        ...state,
        isLoading: false,
        error: JSON.stringify(e),
        status: 'error'
      };
    }
    

    return {
      
      ...state,
      isLoading: false,
      status: 'accepted',
      data: JSON.stringify(json)
      
    };
  }
  case 'onChange':
  {
    return {
      ...state,
      id: action.id
    };
  }

  case 'error':
  { 
    return{
      ...state,
      isLoading: false,
      error: JSON.stringify(action.error),
      status: 'error'
    };
  }

  
  }
};


export const ShowData = () => 
{
  const data = useContext(ContextReducerState);

  const get_data = () => 
  {
    try
    {
      
       
      return JSON.stringify(data);
    } 
    catch(e)
    {
      return JSON.stringify(e);
    }
     
  };

  return (
    <section className='mt-[10px] content-center justify-center flex flex-row'>
      <div className='w-[600px]'>
        {get_data()}
      </div>
    </section>
  );
};


// @ts-ignore
export const ButtonWithApi = ({ api, name }) => 
{
    
  const [ state, dispatch ] = useAsyncReducer(AsyncApiReducer(api), { id: NaN, isLoading: false });

  const dispatchData = useContext(ContextReducerDispatch);
  const data = useContext(ContextReducerState);
  
  const button_handler = async () => 
  {
    await dispatch({ name: 'loading' });
    
    try
    {
      const res = await api(state.id);
      // @ts-ignore
      dispatchData({ name: 'setData', data: res });
      await dispatch({ name: 'loaded' });
    }
    catch(e)
    {
      await dispatch({ name: 'error', error: e });
    }
    
      
    // @ts-ignore
    

  };
  
  return(
    <>
      <div className='mt-[10px] flex content-center justify-center w-[100%] flex-col'>
        <section className='mt-[10px] content-center justify-center flex flex-row'>
          <button className={TailwindStyles.button + ' mr-[7px] h-[50px]'}
            onClick={button_handler}>{name ?? 'Do API'}</button>

          <input 
            className='border-[1px] border-[#000] rounded-md p-[10px] w-[100px] h-[50px] '
            type="text" 
            onChange={(e) => dispatch({ name: 'onChange', id: e.target.value })}
          />

        </section>

        <section className='mt-[10px] content-center justify-center flex flex-row'>
          {state.isLoading && <div>Loading...</div>}
          {state.error && <div>{state.error}</div>} 
          
        </section>        
      </div>
    </>
  );
};

export const LoadingButton = () => 
{

  const [ state, dispatch ] = [ useContext(ContextReducerState), useContext(ContextReducerDispatch) ];
  
  const reset = () => 
  {    
    if(dispatch != null)
    {
      dispatch({ ...state, name: 'reset' });
    }
  };
  
  return(
    <>
      <div className={TailwindStyles.button + ' mr-[7px] h-[50px]'}>Loading...</div>
      <button
        onClick={reset} 
        className={TailwindStyles.button + ' mr-[7px] h-[50px]'}
      >Reset</button>
      
    </>
  );

};

// @ts-ignore
export const ButtonWithInput = ({ button_name, button_hanlder, classNameButton, classNameInput }) => 
{
    
  const [ reducerState, dispatch ] = [ useContext(ContextReducerState), useContext(ContextReducerDispatch) ];
  const [ input, setInput ] = useState('');
  

  return(
    <>
      <div className='mt-[10px] flex content-center justify-center w-[100%] flex-col'>
        <section className='mt-[10px] content-center justify-center flex flex-row'>
          {reducerState.loading 
            ?<LoadingButton/>
            : <button className={TailwindStyles.button + ' mr-[7px] h-[50px] ' + classNameButton}
              onClick={() => button_hanlder(input)}>{button_name ?? 'Do API'}</button>
          }
          

          <input 
            className={'border-[1px] border-[#000] rounded-md p-[10px] w-[100px] h-[50px] '+ classNameInput }
            type="text" 
            onChange={(e) => setInput(e.target.value)}
          />

        </section>

      </div>
    </>
  );
};


export const CheckExistTableApp = () => 
{
  const dispatch = useContext(ContextReducerDispatch);
  const state = useContext(ContextReducerState);

  const add_release = async (id: string) => 
  {
    // console.log(new Date());
    id = JSON.parse(id);
    
    
    if(dispatch == null)
    {
      return;
    }

    
    dispatch({ name: 'setLoading', loading: true });
    const arr = Array.isArray(id)? id : [ id ];
    for(const id of arr)
    {
      
      // eslint-disable-next-line
      let { json, status } = await DiscogsApiBackend.get_release(id);
      console.log(status);
      
      switch(status)
      {
      case HttpStatus.TOO_MANY_REQUESTS:
      {
        await timeout(1000);
        continue;
      }
      case HttpStatus.NOT_FOUND:
      {

        const { _, status } = await DiscogsApiBackend.save_release(id);
        console.log(status);
        
        if(status === HttpStatus.TOO_MANY_REQUESTS)
        {
          await timeout(1000);
          continue;
        }

        json = (await DiscogsApiBackend.get_release(id)).json;
        
        if(json == 'null')
        {
          continue;
        }
      }
      }
    

      const get_artist = (): string => 
      {
      // @ts-ignore
        if('artists' in json)
        {
          if(Array.isArray(json.artists))
          {
          // @ts-ignore
            return json.artists.map(v => v.name + '').reduce((a, b) => `${a}, ${b}`);
          }
        
          return json.artists + ''; 
        }
        
        // @ts-ignore
        else if('artist' in json)
        {
          // @ts-ignore
          return json.artist.name + ''; 
        }
      
        return '';

      };

    
      if(json != null)
      {
        // @ts-ignore
        if(!state.tableData.map(v => v.id).includes( json.id + ''))
        {
          const excess_chars = checkVaidate(get_artist());

          const output = {
            // @ts-ignore
            id: json.id + '',
            artist: get_artist(),
            check: (excess_chars.length === 0) + '',
            // @ts-ignore
            album: json.title + '',
            excess_chars: excess_chars

          };
          console.log(output);
        
          dispatch({ name: 'pushRow', pushRow: output });
        }
      }
    }
    dispatch({ name: 'setLoading', loading: false });     
    
  };
  
  return(
    
    <>
      <ButtonWithInput 
        classNameButton={''}
        classNameInput={'w-[200px]'}
        button_hanlder={add_release}
        button_name={'Add release'} ></ButtonWithInput>
      <ExistsIdTable/>
      <ShowData/>
    </>
  );
};

export const ExistsIdTable = () => 
{
  const state = useContext(ContextReducerState);


  return(
    // <div className={'w-[75%]'}>
    <table className={'w-[75%]'}>
      <TableRow arr={[ 'id', 'name', 'check', 'album', 'отредактированная строка', 'лишние символы' ]}/>
      
      {state.tableData.map(
        v => <TableRow arr={[ v.id, v.artist, v.check, v.album, utf_mapper(`${v.artist} ${v.album}`), v.excess_chars ]}/>
      )}
    </table>
    // </div>
  );
};

export const getRelease = () => 
{
  const data = useContext(ContextReducerState);

  return(
    <div>
      <button></button>
    </div>
  );
};

export const DiscogsPage = () => 
{
  return(
    <>
      <div className='flex flex-col justify-center w-[100%]'>
        {/* <DataProvider>
          <ButtonWithApi api={DiscogsApiBackend.save_release} name='Save release' />
          <ButtonWithApi api={DiscogsApiBackend.get_release} name='Get release'/>
          <ShowData/>


        </DataProvider> */}
        <TableProvider>
          <CheckExistTableApp/>
        </TableProvider>
        
        <IndexContextProvider>
          <ChangeCharsTable/>
        </IndexContextProvider>
      </div>
      
      
    </>
  );
};

const range = (start: number, end: number) => [ ...Array(end - start).keys() ].map(v => v + start);


// class TableKeyListener
// {
//   constructor(private ref_number: React.RefObject<number>)
//   {
//     document.addEventListener('keydown', this.tab_handler);
//   }

//   private tab_handler(ev: KeyboardEvent)
//   {
//     console.log(this.ref_number);
    
//     if(ev.key === 'Tab')
//     {
//       console.log(ev.key);
//     } 
//   }

//   destruct()
//   {
//     document.removeEventListener('keydown', this.tab_handler);
//   }
// }


// const UseTabPressComponent = (ind: number, setInd: (num: number) => void) => 
// {
//   const get_ind = () => ind;


//   useEffect(() => 
//   {
//     const tab_hanlder = (ev: KeyboardEvent) => 
//     {
//       console.log(`handler ind ${get_ind()}`);
//       if(ev.key === 'Tab')
//       {
//         console.log(ev.key);
        
//         setInd((ind + 1) % 64);

        
//       } 
//     };
//     document.addEventListener('keydown', tab_hanlder);

//     return () => document.removeEventListener('keydown', tab_hanlder);
//   }, []);

//   useEffect(() => 
//   {
//     console.log(`inner ind ${ind}`);
    
//   }, [ ind ]);
  
//   return;
// };

interface IIndexContext{
  State: {index: number},
  Action: {name: 'change_index', index: number},
  Dispatch: React.Dispatch<IIndexContext['Action']>,
}


const IndexContextDispatch = createContext<null | IIndexContext['Dispatch']>(null);
const IndexContextState = createContext<null | IIndexContext['State']>(null);

const indexReducer = (state: IIndexContext['State'], action: IIndexContext['Action']) => 
{
  console.log(action);
  
  switch(action.name)
  {
  case 'change_index':
  {
    return{
      ...state,
      index: action.index
    };
  }
    
  }
};

const IndexContextProvider = ({ children }: {children: any}) => 
{
  const [ state, dispatch ] = useReducer(indexReducer, { index: -1 });
  
  return (
    <IndexContextDispatch.Provider value={dispatch}>
      <IndexContextState.Provider value={state}>
        {children}
      </IndexContextState.Provider>
    </IndexContextDispatch.Provider>
  );
  
};


const useTableKey = (elem: HTMLDivElement | null) => 
{
  if(!elem)
  {
    return;
  }

  const dispatchIndex = useContext(IndexContextDispatch);
  const index = useContext(IndexContextState);
  
  // document.addEventListener('keydown', handler);
  
  function handler(ev: KeyboardEvent)
  {
    if(!index || !dispatchIndex)
    {
      return;
    }
    console.log(index);
      
    if(ev.key === 'Tab')
    {
      console.log(`TAB ${index.index}`);
        
      dispatchIndex({ name: 'change_index', index: index.index + 1 });
    }
  }
  
  useEffect(() => 
  {
    console.log(index);
    
    if(index === null || dispatchIndex === null)
    {
      return;
    }
    elem.addEventListener('keydown', handler);
    
    return () => 
    {
      console.log('document.removeEventListener');
      
      elem.removeEventListener('keydown', handler);
    };
  }, []);  

  useEffect(() => 
  {
    console.log(`Update hook ${index?.index}`);
    
    
  }, [ index ]);

  return index;
};


const ChangeCharsTable = () => 
{

  const generate_row = (start: number, end: number, page: number) => 
    range(start, end).map(v => String.fromCharCode(v + 256 * page));

  const [ page, setPage ] = useState(0);
  const [ map, setMap ] = useState(Array(64).fill(''));
  const tableRef = useRef(null);

  const index = useContext(IndexContextState);
  const dispatchIndex = useContext(IndexContextDispatch);
  
  if(index === null || dispatchIndex === null)
  {
    return <></>;
  }
  
  useEffect(() => 
  {
    // console.log('Context like state');
    // console.log(index, dispatchIndex);
     
  });

  
  // useTableKey(tableRef.current);
  

  const rows = range(0 * 16, 1 * 16).map(k => generate_row( k * 8 , (k + 1) * 8, page));
  

  const InputCell = ({ select_ind, ind }: {select_ind: number, ind: number}) => 
  {
    
    return(
      <>
        {select_ind === ind ?
          <input 
            className='border-2 border-[#000] rounded-md w-[50px]' 
            type="text"
            autoFocus={true}
            value={map[ind]}
            onChange={e => 
            {
              const arr = [ ...map ];
              arr[ind] = e.target.value;
              setMap(arr);
            }}
          /> : 

          <div>{map[ind]}</div>
        }
      </>
      
      
    );
  };
  

  const pressHandler: KeyboardEventHandler<HTMLDivElement> = (e) => 
  {
    const selector: Record<string, number> = {
      'ArrowRight': index.index + 1,
      'ArrowLeft':  index.index - 1,
      'ArrowUp':    index.index - 8,
      'ArrowDown':  index.index + 8,
    };
    
    if(typeof selector[e.key] === 'number')
    {   
      dispatchIndex({ name: 'change_index', index: selector[e.key] % 128 });
    }
  };

  return(
    <div className='w-[100%]' ref={tableRef} onKeyDown={pressHandler}>
      <button className='w-[64px] border-[1px] rounded-md' onClick={e => setPage(page - 1)}>-</button>
      <button className='w-[64px] border-[1px] rounded-md' onClick={e => setPage(page + 1)}>+</button>
      
      <div className='w-[64px] border-[1px] rounded-sm'>Page: {page}</div>

      <table className='w-[100%] table-fixed'>
        {rows.map((row, y) => 
        {
          const new_row = row.map((val, x) => 
            <div className='flex justify-around' onClick={() => 
            {
              dispatchIndex({ name: 'change_index', index: 8 * y + x });   
            }
            }>
              <div>{val}</div>
              <InputCell select_ind={index.index} ind={8 * y + x}/>
            </div>
          );
          
          return <TableRow arr={new_row}/>;
        })}
      </table>
    </div>
  );
};
type PropDiscogsRow = {str: string}

export const DiscogsRow = ({ str }: PropDiscogsRow) => 
{
  const data = JSON.parse(str);

  return (
    <div className='flex'>
      <div>{data.id}</div>
      
    </div>
  );
};

// export const DiscogsTable = () => 
// {

// };