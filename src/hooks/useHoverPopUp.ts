import { MutableRefObject, useEffect, useState } from 'react';


/**
 * 
 * @param ref Ref for inner component
 * @returns states for
 */
export function useHoverPopUp(ref: MutableRefObject<HTMLDivElement | null>)
{
  const [ hide, setHide ] = useState(true);
  const [ pos, setPos ] = useState<[number, number]>([ 0, 0 ]);

  useEffect(() => 
  {
    if(ref.current && ref.current.parentElement)
    {
      const parent = ref.current.parentElement; 
        
      parent.onmouseenter = () => setHide(false);
      parent.onmouseleave = () => setHide(true);
      parent.onmousemove = (e) => setPos([ e.clientX + 20, e.clientY ]);
      
    }
  }, []);


  return { hide: hide, pos: pos };
}

export interface HoverPopUpProps{
    hide: boolean,
    pos: [number, number]
}