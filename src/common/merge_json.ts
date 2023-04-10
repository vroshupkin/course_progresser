export interface TObject<T> {
  [s: string]: T;
}

export function mergeObjects(
  input: TObject<any>,
  ...objects: TObject<any>[]
): TObject<any> 
{
  for (const obj of objects) 
  {
    input = { ...input, ...obj };
  }
  return input;
}
