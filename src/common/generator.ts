

/**
 * @example range(6) => [0, 1, 2, 3, 4, 5]; range(2, 6) => [2, 3, 4, 5]
 */
export const range = (start: number, end?: number) => 
{
  if(end === undefined)
  {
    end = start;
    start = 0;
  }
  
  return new Array(end- start).fill(0).map((_, i) => i + start);  
};
