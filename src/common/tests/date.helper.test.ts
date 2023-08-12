import { DateHelper } from '../date.helper';

describe('date_helper', () => 
{
  test('getDayOfYear', () => 
  {
    const res = [ '08/01/23', '08/02/23' ]
      .map(str => new Date(str))
      .map(date => DateHelper.DateToDayOrder(date));
    
    
    expect(res[1] - res[0]).toBe(1);
  });

  test('getDayOfYear', () => 
  {
    const res = [ '08/01/23', '08/02/23' ]
      .map(str => new Date(str))
      .map(date => DateHelper.DateToDayOrder(date));
    
    
    expect(res[1] - res[0]).toBe(1);
  });
    
  test.todo('unit date_helper.changeDays');


});
