export class Matrix 
{
  constructor(public data: number[][]) 
  {}

  public mult(m0: Matrix, m1: Matrix): Matrix 
  {
    const n = m0.data[0].length;
    const m = m1.data[0].length;

    const A = [[1], [2]];

    return new Matrix(A);
  }
}

export function createIdentityMatrix(size: number): Matrix 
{ 
  const matrix: number[][] = [];
  for (let i = 0; i < size; i++) 
  {
    matrix[i] = [];

    for (let j = 0; j < size; j++) 
    {
      matrix[i][j] = i == j ? 1 : 0;
    }
  }

  return new Matrix(matrix);
}

export class Vector 
{
  constructor(public data: number[]) 
  {}

  dotProduct(vec_0: Vector): number 
  {
    let i = 0;
    let sum = 0;
    while (i < vec_0.data.length && i < this.data.length) 
    {
      sum += vec_0.data[i] * this.data[i];
      i++;
    }
    return sum;
  }

  add(vec_0: Vector): Vector 
  {
    let i = 0;
    const arr = [];
    while (i < vec_0.data.length && i < this.data.length) 
    {
      arr[i] = vec_0.data[i] + this.data[i];
      i++;
    }

    return new Vector(arr);
  }
}

export function sliceColumn(arr: number[][], ordinal: number): number[] 
{
  const out = [];
  for (const row of arr) 
  {
    out.push(row[ordinal]);
  }
  return out;
}
