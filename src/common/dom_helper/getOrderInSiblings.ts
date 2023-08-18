
/**
 * HTML DOM 
 * Возвращает порядок элемента относительно его саблингов
 */
export const getOrderInSiblings  = (elem: HTMLElement) => 
{
  const parent = elem.parentNode;

  if(parent)
  {
    for(let i = 0; i < parent.children.length; i++)
    {
      if(elem === parent.children[i])
      {
        return i;
      }
    }
  }

  return -1;
};


