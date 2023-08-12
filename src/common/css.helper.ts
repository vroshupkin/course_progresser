import { CSSProperties } from 'react';

export const applyStyle = (element: HTMLElement, style: CSSProperties) => 
{
  for (const name of Object.keys(style)) 
  {
    // @ts-ignore
    element.style[name] = style[name];
  }
};