// -1 Не правильно заданная строка
export const TimeParser = (str: string): number => 
{
  const arr = str.split(':').map(v => Number(v));
  if(arr.length > 3 || arr.length == 0)
  {
    return -1;
  }
  const coef = [ 1, 60, 3600 ];

  let i = arr.length - 1;

  let sum = 0;
  for (const num of arr) 
  {
    if(Number.isNaN(num))
    {
      return -1;
    }

    if(num < 0 || num > 60)
    {
      return -1;
    }

    sum += coef[i] * num;
    i--;
  }
  
  return sum;
}; 

export const SecondsTo_hh_mm_ss = (seconds: number): string => 
{
  const hours = Math.floor(seconds/3600);
  seconds -= hours * 3600;
  const minutes = Math.floor(seconds/60);
  seconds -= minutes * 60;
 
  const to_str = (t: number) => 
  {
    if(t < 10)
    {
      return '0' + t;
    }
    
    return t + '';
  };
  
  return `${to_str(hours)}:${to_str(minutes)}:${to_str(seconds)}`;
};
