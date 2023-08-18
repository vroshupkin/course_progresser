import { DateHelper, isLeapYear } from './date.helper';

describe('date_helper', () => 
{
  test('isLeapYear', () => 
  {

    const isAllLeapYear = 
      [ 1200, 1600, 2000, 2004, 2008, 2012 ]
        .map(year => isLeapYear(year))
        .reduce((a, b) => a && b);

    expect(isAllLeapYear).toBe(true);

  });

  test('isNotLeapYear', () => 
  {
    expect(
      [ 100, 200, 500, 1 ].map(year => !isLeapYear(year)).reduce((a, b) => a && b)
    ).toBe(true);


  });

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
