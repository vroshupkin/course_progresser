export class numberGuard 
{
  static positive(num: number): void 
  {
    if (num < 0) 
    {
      throw Error('num must be positive');
    }
  }

  static greaterZero(num: number): void 
  {
    if (num <= 0) 
    {
      throw Error('num must be positive');
    }
  }
}

/**
 * Берет amountDigitAfterPoint знаков после запятой
 * @param amountDigitAfterPoint Количество знаком после запятой
 */
export function viewNumber(num: number, amountDigitAfterPoint: number): string 
{
  numberGuard.positive(amountDigitAfterPoint);

  const pointIndex = `${num}`.indexOf('.');

  return `${num}`.slice(0, pointIndex + amountDigitAfterPoint);
}

/**
 * Выводит целочисленное рандомное число в диапазоне [min, max]
 * @returns 
 */
export function getRandomInt(min: number, max: number): number 
{
  return Math.floor(Math.random() * (max - min + 1) + min);
}
