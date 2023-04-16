import { TimeParser } from '../parsers';

describe('validateTime', () => 
{  
  const good_variants = [ '1', '12', '1:1', '1:12', '10:12', '1:11:12' ];
  const good_variants_answare = [ 1, 12, 61, 72, 612, 4272 ];

  const bad_variants = [ '61', '-1', '200:1', '-12:34' ];
  

  test('bad variants', () => 
  {
    const arr = bad_variants.map(v => TimeParser(v));
    for (let i = 0; i < arr.length; i++) 
    {
      expect(arr[i]).toEqual(-1);
    }
    
  });

  
  test('parse good variants', () => 
  {
    const arr = good_variants.map(v => TimeParser(v));
    
    for(let i = arr.length - 1; i >= 0; i--)
    {
      expect(arr[i]).toEqual(good_variants_answare[i]);
    }
    
  });


});


