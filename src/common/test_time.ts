

// Считает время исполнения функции
export const test_time = (n: number) => (func: (...input: any) => any) =>(input: any[]) =>
{
  const start = new Date();

  let i = 0;
  while(i < n)
  {
    func(...input);
    i++;
  }
  const end = new Date();

  return new Date(Number(end) - Number(start));
};


const get_file_extension_1 = (file_name: string) => 
{
  const arr = file_name.split('.');
  
  return arr[arr.length - 1];
};


const get_file_extension_2 = (file_name: string) => 
{
  for(let i = file_name.length - 1; i >= 0; i--)
  {
    if(file_name[i] == '.')
    {
      if(i == file_name.length - 1)
      {
        return '';
      }

      return file_name.slice(i + 1, file_name.length);
    }
  }

  return '';
};


const n = 10000000;
const res_1 = test_time(n)(get_file_extension_1)([ 'ab.de.f.' ]);
const res_2 = test_time(n)(get_file_extension_2)([ 'ab.de.f.' ]);

// console.log(Number(res_1) - Number(res_2));