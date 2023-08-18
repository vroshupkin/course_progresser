type arrowProps = {
  type: '<' | '>',
  onClick: React.MouseEventHandler<HTMLDivElement>
}
export const Arrow = (props: arrowProps) => 
{
  return(
    <div className={
      'flex justify-center items-center w-[37px] h-[29px] cursor-pointer select-none ' + 
      'hover:border-[1px] hover:border-solid hover:border-c-blue'}
    onClick={props.onClick}>
      <span>{props.type}</span>
    </div>
  );
};

