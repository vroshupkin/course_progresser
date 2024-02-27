// @ts-ignore
export const Th = ({ children }) => 
{
  return(
    <th className='border-2 hover:bg-[#eee]'>{children}</th>
  );
};

export const TableRow = <T, >(argv: {arr: T[]}) => 
  <tr>
    {argv.arr.map(v => <Th>{v}</Th>)}
  </tr>;

