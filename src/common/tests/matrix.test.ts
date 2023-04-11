import { createIdentityMatrix, sliceColumn, Vector } from '../matrix';

describe('sliceColumn()', () => 
{
  const arr_0 = [
    [ 1, 2, 3 ],
    [ 3, 4, 5 ],
    [ 6, 7, 8 ],
  ];

  test('Забрать 0ой столбец', () => 
  {
    expect(sliceColumn(arr_0, 0)).toStrictEqual([ 1, 3, 6 ]);
  });
});

describe('Vector.add()', () => 
{
  const v0 = new Vector([ 1, 2, 3 ]);
  const v1 = new Vector([ 2, -2, 0 ]);
  const v2 = v0.add(v1);

  test('[1, 2, 3] + [2, -2, 0]', () => 
  {
    expect(v2.data).toStrictEqual([ 3, 0, 3 ]);
  });
});

describe('Vector.dotProduct()', () => 
{
  const v0 = new Vector([ 1, 2, 3 ]);
  const v1 = new Vector([ 2, -2, 0 ]);
  const v2 = v0.dotProduct(v1);

  test('[1, 2, 3].dotProduct([2, -2, 0]) ', () => 
  {
    expect(v2).toStrictEqual(-2);
  });
});

describe('createIdentity matrix', () => 
{
  createIdentityMatrix(3);

  test('Identity matrix size = 3', () => 
  {
    expect(createIdentityMatrix(3).data).toStrictEqual([
      [ 1, 0, 0 ],
      [ 0, 1, 0 ],
      [ 0, 0, 1 ],
    ]);
  });
});
