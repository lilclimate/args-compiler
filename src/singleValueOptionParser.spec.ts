import { describe, expect, test } from "vitest";
import { IntDefaultValue, singleValueOptionParser, StringDefaultValue } from "./singleValueOptionParser";

describe('single value option parser', () => {
	const intType = singleValueOptionParser(IntDefaultValue, parseInt);
	test('should return int value if array with single value given', () => {
		expect(intType(['1'])).toEqual(1);
	});

	test('should throw exception if more than 1 value present', () => {
		expect(() => intType(['8080', '8090'])).toThrowError('too many values');
	});

	test('should throw exception if no value present', () => {
		expect(() => intType([])).toThrowError('too few values');
	});

	test('should return default value if undefined value given', () => {
		expect(intType(undefined)).toEqual(8080);
	});

	const stringType = singleValueOptionParser(StringDefaultValue, (value) => value);
	test('should return default value if undefined value given', () => {
		expect(stringType(undefined)).toEqual('null');
	});
});
