/** Дискретный интеграл */
export const integral = (arr: number[]) => 
{
  let i = 1;
  while(i < arr.length)
  {
    arr[i] += arr[i - 1];
    i++;
  }

  return arr;
};
