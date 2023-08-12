// WHY?
export class Procent 
{
  static getValue(procent: number, min: number, max: number): number 
  {
    if (procent > 1) 
    {
      return max;
    }
    if (procent <= 0) 
    {
      return min;
    }

    return procent * (max + min) + min;
  }
}
