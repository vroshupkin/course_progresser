
import React, { KeyboardEventHandler, createContext, useContext, useEffect, useReducer, useRef, useState } from 'react';
import { HttpStatus } from '../../common/HTTPStatus';
import { timeout } from '../../common/test_time';
import { TailwindStyles } from '../../shared/TailwindStyles';
import { checkVaidate } from '../../shared/checkValidateSymbol';
import { ChunkIterator } from '../../shared/iterators/ChunkIterator';
import { utf_mapper } from '../../shared/mappUtf';
import { ModalView } from '../../widgets/Modal_1/Modal_1';
import { TableRow } from '../../widgets/Table';
import { DiscogsApiBackend } from './Discogs.api';
import { ContextReducerDispatch, ContextReducerState, TableProvider } from './Table.store';


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

const CenterSection = ({ children }: {children: any}) => 
{
  return(
    <div className='mt-[10px] flex content-center justify-center w-[100%] flex-col'>
      <section className='mt-[10px] content-center justify-center flex flex-row'>
        {children}
      </section>
    </div>
  );
};
 
// @ts-ignore
export const ButtonWithInput = ({ button_name, button_hanlder, classNameButton, classNameInput }) => 
{
    
  const [ reducerState, dispatch ] = [ useContext(ContextReducerState), useContext(ContextReducerDispatch) ];
  const [ input, setInput ] = useState('');
  

  return(
    <>
      <CenterSection>
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

      </CenterSection>
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
  
  const clear_table_class = 'w-[200px] bg-[#666] hover:bg-[#888] ' +
  'rounded-md p-[10px] border-[#000] border-[1px] text-[#eee] mr-[7px] h-[50px] ';
  
  return(
    
    <>
      <ButtonWithInput 
        classNameButton={''}
        classNameInput={'w-[200px]'}
        button_hanlder={add_release}
        button_name={'Add release'} 
      />
      <CenterSection>
        <button className={clear_table_class} onClick={() => 
        {
          if(dispatch)
          {
            dispatch({ name: 'clear' });
          }
          
        }}>Clear table</button>
      </CenterSection>
      

      <ExistsIdTable/>
      <ShowData/>
    </>
  );
};

export const ExistsIdTable = () => 
{
  const state = useContext(ContextReducerState);

  const utf_map = JSON.parse(TablePage.getAllPages(20));

  return(
    // <div className={'w-[75%]'}>
    <table className={'w-[75%]'}>
      <TableRow arr={[ 'id', 'name', 'check', 'album', 'отредактированная строка', 'лишние символы' ]}/>
      
      {state.tableData.map(
        v => <TableRow arr={[ v.id, v.artist, v.check, v.album, utf_mapper(utf_map)(`${v.artist} ${v.album}`), v.excess_chars ]}/>
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
        
        <MapperTableProvider>
          <ChangeCharsTable/>
        </MapperTableProvider>
      </div>
      
      
    </>
  );
};

const range = (start: number, end: number) => [ ...Array(end - start).keys() ].map(v => v + start);


interface IIndexContext{
  State: 
  {
    index: number,
     page: number,
     map: string[]
    },
  Action: 
  {
    name: 'change_index',
    index: number
  } | 
  {
    name: 'change_page',
    page: number,
    map: string[]
  } |
  {
    name: 'change_map',
    map: string[]
  } |
  {
    name: 'load_page',
    page: number
  },


  Dispatch: React.Dispatch<IIndexContext['Action']>,
}


const MapperContextDispatch = createContext<null | IIndexContext['Dispatch']>(null);
const MapperContextState = createContext<null | IIndexContext['State']>(null);

const mapTableReducer = (state: IIndexContext['State'], action: IIndexContext['Action']) => 
{
  switch(action.name)
  {
  case 'change_index':
  {
    return{
      ...state,
      index: action.index
    };
  }
  case 'change_page':
  {
    return{
      ...state,
      page: action.page,
      map: action.map
    };
  }

  case 'change_map':
  {
    return{
      ...state,
      map: action.map
    };
  }

  case 'load_page':
  {
    return{
      ...state,
      map: new TablePage(action.page).get_map()
    };
  }

    
  }
};

const MapperTableProvider = ({ children }: {children: any}) => 
{
  
  const [ state, dispatch ] = useReducer(mapTableReducer, { index: -1, page: 0, map: Array<string>(128).fill('') });
  
  return (
    <MapperContextDispatch.Provider value={dispatch}>
      <MapperContextState.Provider value={state}>
        {children}
      </MapperContextState.Provider>
    </MapperContextDispatch.Provider>
  );
  
};


const ChangeCharsTable = () => 
{
  
  const generate_row = (start: number, end: number, page: number) => 
    range(start, end).map(v => String.fromCharCode(v + 128 * page));

  const tableRef = useRef(null);

  const state = useContext(MapperContextState);
  const dispatch = useContext(MapperContextDispatch);
  
  if(state === null || dispatch === null)
  {
    return <></>;
  }
  
  useEffect(() => 
  {
    console.log(state.map);
    
  }, [ state ]);


  const rows = range(0 * 16, 1 * 16).map(k => generate_row( k * 8 , (k + 1) * 8, state.page));
  

  const InputCell = ({ select_ind, ind }: {select_ind: number, ind: number}) => 
  {

    const bg_style = state.map[ind] ? { backgroundColor : 'green' }: { backgroundColor : 'white' };

    return(
      <>
        {select_ind === ind ?
          <input 
            className={'border-2 border-[#000] rounded-md w-[50px]'}  
            type="text"
            autoFocus={true}
            value={state.map[ind]}
            onChange={e => 
            {
              const arr = [ ...state.map ];
              arr[ind] = e.target.value;
              
              
              // setMap(arr);
              dispatch({ name: 'change_map', map: arr });
            }}
          /> : 

          <div style={bg_style} className='w-[25%]'>{state.map[ind]}</div>
        }
      </>
      
      
    );
  };
  
  useEffect(() => 
  {
    dispatch({ name: 'load_page', page: 0 });
  }, []);


  const pressHandler: KeyboardEventHandler<HTMLDivElement> = (e) => 
  {
    const selector: Record<string, number> = {
      'ArrowRight': state.index + 1,
      'ArrowLeft':  state.index - 1,
      'ArrowUp':    state.index - 8,
      'ArrowDown':  state.index + 8,
    };
    
    if(typeof selector[e.key] === 'number')
    {   
      dispatch({ name: 'change_index', index: selector[e.key] % 128 });
    }
  };

  const change_page = (current_page: number, next_page: number) => 
  {
    new TablePage(current_page).save(state.map);
    const map = new TablePage(next_page).get_map();

    dispatch({ name: 'change_page', page: next_page, map });
  };

  const prev_page = () => 
  {
    if(state.page > 0)
    {
      change_page(state.page, state.page - 1);
    }
    
  };

  const next_page = () => 
  {
    change_page(state.page, state.page + 1);
  };

  const GetAllPagesHandler = () => 
  {
    const arr = TablePage.getAllPages(10);

    console.log(`const arr = ${arr};`);

    
  };

  const save_page = (str: string) => 
  {
    // eslint-disable-next-line     
    const data = str.replaceAll("'", '"');
      
      
    const arr = JSON.parse(data);
    if(!Array.isArray(arr))
    {
      return; 
    }
      
    let page = 0;
    for(const str_arr of ChunkIterator(arr))
    {
      new TablePage(page).save(str_arr);
      page++;
    }
    
  };
  
  const [ showModal, setShowModal ] = useState(false);

  return(
    <>
      
      <ModalView onAccept={save_page} setShow={setShowModal} show={showModal}/>
      
    
      <div className='w-[100%]' ref={tableRef} onKeyDown={pressHandler}>
        <div className='flex'>
          <div className='w-[100px] border-[1px] rounded-md '>{state.page * 128} - {(state.page + 1) * 128}</div>
          <button className='w-[64px] border-[1px] rounded-md hover:bg-[#ccc]' onClick={prev_page}>-</button>
          <div className='w-[64px] border-[1px] rounded-md '>Page: {state.page}</div>
          <button className='w-[64px] border-[1px] rounded-md hover:bg-[#ccc]' onClick={next_page}>+</button>
          <button className='w-[128px] ml-2 border-[1px] rounded-md hover:bg-[#ccc]' onClick={GetAllPagesHandler}>
          Get all page</button>
          <button className='w-[256px] ml-2 border-[1px] rounded-md hover:bg-[#ccc]' 
            onClick={_ => setShowModal(true)}>
          Внести данные таблицы</button>
        
        </div>
      
      
        <table className='w-[100%] table-fixed'>
          {rows.map((row, y) => 
          {
            const new_row = row.map((val, x) => 
              <div className='flex justify-around' onClick={() => 
              {
                dispatch({ name: 'change_index', index: 8 * y + x });   
              }
              }>
                <div>{val}</div>
                <InputCell select_ind={state.index} ind={8 * y + x}/>
              </div>
            );
          
            return <TableRow arr={new_row}/>;
          })}
        </table>
      </div>
    </>
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


class TablePage
{
  constructor(private page: number)
  {}

  private get key()
  {
    return `TablePage_${this.page}`;
  }

  save(page_map: string[])
  {
    localStorage.setItem(this.key, JSON.stringify(page_map));
  }

  get_map()
  {
    const raw_str = localStorage.getItem(this.key);
    
    return raw_str ? JSON.parse(raw_str) : Array(128).fill(''); 
  }

  /**
 * @param n первые n страниц
 */
  static getAllPages(n: number)
  {
    
    const arr = [];
    for(let page = 0; page < n; page++)
    {
      const raw_str = localStorage.getItem(`TablePage_${page}`);
      const read_arr = raw_str ? JSON.parse(raw_str) : Array(128).fill('');
      arr.push(...read_arr);
    }

    const str = JSON.stringify(arr);
    let out = '';
    let col = 1;
    let is_string_literal = false;

    for(let i = 0; i < str.length; i++)
    {
      if(str[i] === '"')
      { 
        is_string_literal = !is_string_literal;
      }
    
    
      out += str[i];
      if(col >= 100 && is_string_literal == false)
      { 
        out += '\n';
        col = 0;
      }
    
      col++;
    }
  
  
    return out;
  }

}


