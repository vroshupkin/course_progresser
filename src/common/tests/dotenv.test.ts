import dotenv from 'dotenv';
dotenv.config();


describe('dotenv', () => 
{
  test('Читается dot env и проверяется установлен ли порт', () => 
  {
    expect(process.env.PORT != undefined).toBe(true);
  });
    
});

