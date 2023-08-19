
type GraphWeekSelectorCellProps = {
  type: 'left' | 'right' | 'common',
  children: string | number,
  select: boolean,
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export const DayCell = ({ children, select, type, onClick }: GraphWeekSelectorCellProps) => 
{
  const specificClass = type === 'left'? ' left-div-cell' : type === 'right'? ' right-div-cell': '';
  const selectClass = select? ' bg-c-blue text-[white]' : '';
    
  return(
    <div className={
      ' w-[37px] h-[27px]' + 
        ' flex items-center justify-center cursor-pointer' + 
        ' border-[1px] border-solid border-[#C4C4C4] hover:border-[#21BEEF]'
         + specificClass + selectClass
    }
    onClick={onClick}
    >
      <span>{children}</span>
    </div>
  );
};


