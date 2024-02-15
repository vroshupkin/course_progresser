
import React, { useState } from 'react';
import { DiscogsApiBackend } from './Discogs.api';
import { stat } from 'node:fs';

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


const ButtonWithApiReducer = (api: (args: any) => Promise<any>) => async (state: any, action: any) => 
{
  switch(action.name)
  {
  case 'loading':
  {
    return {
      ...state,
      isLoading: true,
      message: ''
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
      message: JSON.stringify(json)
      
    };
  }
  case 'onChange':
  {
    return {
      ...state,
      id: action.id
    };
  }

  
  }
};

// @ts-ignore
export const ButtonWithApi = ({ api, name, showMessage=true }) => 
{
  const [ state, dispatch ] = useAsyncReducer(ButtonWithApiReducer(api), { id: NaN, isLoading: false });

  
  const button_handler = () => 
  {
    dispatch({ name: 'loading' });
    dispatch({ name: 'start_api', args: state.id });
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
          {state.status === 'accepted' ? <div className='text-[#134417]'>Accepted</div>
            : state.status === 'error' ? <div className='text-[#6e1f1f]'>Error</div> : <></>}
          
          {state.message && showMessage ? <div>{state.message}</div> : ''}
          
        </section>        
      </div>
    </>
  );
};

export const DiscogsPage = () => 
{
  return(
    <>
      <div className='flex flex-col justify-center w-[100%]'>
        <ButtonWithApi api={DiscogsApiBackend.save_release} name='Save release' />
        <ButtonWithApi api={DiscogsApiBackend.get_release} name='Get release' showMessage={false}/>


        <table>
          <tr>
            <th></th>
            <th>2</th>
            <th>3</th>
          </tr>

        </table>
      </div>
      
      
    </>
  );
};