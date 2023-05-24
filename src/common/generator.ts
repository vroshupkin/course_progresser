
/**  Генерирует массив от [a, b) с шагом 1
    @example generate(5) => [0, 1, 2, 3, 4]
    @example generate(3, 6) => [3, 5]
*/

export const generate = (a: number, b?: number) => 
{
  if(b === undefined)
  {
    b = a;
    a = 0;
  }
    
  const output: number[] = [];
  while(a < b)
  {
    output.push(a);
    a++;
  }

  return output;
};

