import { MONTH_NAME } from '../../../common/date_helper/date.helper';

export const ShowSelectDay = (props: {selectDay: Date}) => 
{
  const getDateString = (date: Date) => 
  {
    let month =  MONTH_NAME.ru.genetive[date.getMonth()];
    month = month[0].toUpperCase() + month.slice(1);
    
    return(
      `${date.getDate()} ${month} ${date.getFullYear()}`    
    );

  };
    
  return(
    <div className='flex flex-row text-[18px]'>
      <div className='font-[550] text-[#505359] mr-[140px]'>Сегодня</div>
      <div className='mr-[139px] text-[#838890]'>{getDateString(props.selectDay)}</div>
      <div className=' text-[18px] font-[550] text-[#505359] flex flex-row gap-[15px] cursor-pointer'>
        <div>Н</div>
        <div className='text-[#21BEEF]'>2Н</div>
        <div>М</div>
        <div>6М</div>
        <div>Г</div>
      </div>
    </div>
  );
      
};


