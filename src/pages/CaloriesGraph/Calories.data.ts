import { DateHelper } from '../../common/date_helper/date.helper';
import { range } from '../../common/generator';
import { randomInt } from '../../common/number.helper';

export type TCaloriesData = {
  date: Date,
  val: number
}

export const caloriesData: TCaloriesData[] = 
  range(60).map(v => 
  {
    return(
      {
        date: DateHelper.changeDays(new Date(), -v),
        val: randomInt(0, 3000)
      }
    );
  }
  );
  

