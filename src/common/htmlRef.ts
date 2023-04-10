/* 
    Методы для управления html элементами, через React ref
*/
export class Div 
{
  constructor(public div: React.RefObject<HTMLDivElement>) 
  {}

  changeWidth(width: number): void 
  {
    if (this.div.current) 
    {
      this.div.current.style.width = width + 'px';
    }
  }
}
