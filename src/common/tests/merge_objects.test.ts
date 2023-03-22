import { mergeObjects } from '../merge_json';

describe('mergeObjects()', () => {
	const obj_1 = {
		1: 10,
		2: 20,
		abcde: 'qwerty',
		ab: 'nu',
	};

	const obj_2 = {
		3: 30,
		abcde: 'zxcv',
	};

	const obj_3 = {
		e: 'hello',
	};

	const expect_obj = {
		1: 10,
		2: 20,
		abcde: 'zxcv',
		ab: 'nu',
		3: 30,
		e: 'hello',
	};

	test(`mergeObjects()`, () => {
		expect(expect_obj).toMatchObject(mergeObjects(obj_1, obj_2, obj_3));
	});
});
