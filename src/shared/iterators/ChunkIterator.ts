export const ChunkIterator = function*<T>(arr: T[], step = 128)
{
  let n = 0;
    
  while(n * step < arr.length)
  {   
    const out = arr.slice(n * step, (n + 1) * step);
        
    n++;
    yield out;
  }

};

