import { describe, expect, test } from "vitest";
import { booleanOptionParser } from "./booleanOptionParser";
import { IntDefaultValue, singleValueOptionParser, StringDefaultValue } from "./singleValueOptionParser";

describe('bool', () => {
	const type = booleanOptionParser();
	test('should return true if empty array given', () => {
		expect(type([])).toBeTruthy();
	});

	test('should return false if undefined given', () => {
		expect(type(undefined)).toBeFalsy();
	});

	test('should throw error if not empty array given', () => {
		expect(() => type(['true'])).toThrowError("too many values");
	});
});

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
