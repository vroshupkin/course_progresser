import { FC, useState } from 'react';
import { TailwindStyles } from '../../shared/TailwindStyles';

// const modal_slice = createSlice({
//   name: 'modal',
//   initialState: { data: '' },

//   reducers: {
//     save_popup_data: (state, action) => 
//     {
//       state.data = action.payload.data; 
//     }
//   },
// });

// const { save_popup_data } = modal_slice.actions;
// export const Modal_1Reducer = modal_slice.reducer;
// export const Modal_1Actions = modal_slice.actions;


export const ModalView: FC<{
     setShow: (b: boolean) => void,
    onAccept: (str: string) => void,  
    show: boolean
}> = ({ onAccept, show, setShow }) => 
{
  const [ data, setData ] = useState('');
  
  const center_style = 
  {
    left: 0.5 * window.innerWidth - 250,
    top:  0.1 * window.innerHeight,
  };
  
  return(
    
    show ?
      <div className='absolute w-[100%] h-[100%] bg-[#000] bg-opacity-20'>
        <div 
          style={center_style}
          className='w-[500px] h-[500px] border-2 rounded-md fixed bg-[#fff] '
        >
      
          <div className='absolute left-[95%] top-[-20px]' onClick={() => setShow(false)}>
            <button 
              onClick={_ => setShow(false)}
              className={TailwindStyles.button + ' w-[46px] bg-[#ff6d6d]'}>
          X
            </button>
          </div>

          <div className='flex flex-col justify-center items-center h-[100%]'>
            <h1>Внесите массив</h1>
            <textarea 
              onChange={e => setData(e.target.value + '')}
              className={TailwindStyles.border + ' w-[80%] h-[80%]'}  
            />
            <button 
              onClick={_ => 
              { 
                onAccept(data);
              }}

              className={TailwindStyles.button + ' mt-1'}>Применить</button>
          </div>
      
        </div>
      </div>

      : <></>

  );
};