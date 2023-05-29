import { FC, ReactElement, useRef } from 'react';
import { CenterPopupClasses } from './CenterPopup.style';
import { class_selector } from '../../common/class_helper';


export const CenterPopup: FC<{children: React.ReactNode, isDisplay: boolean}> = ({ children, isDisplay }) => 
{
  const classes = CenterPopupClasses();
  const div_ref = useRef<HTMLDivElement>(null);
    
  class_selector(div_ref, classes.display, classes.hide, isDisplay);
  
  return (
    <div ref={div_ref}>
      {children}
    </div>
  );
};

