import { describe, expect, test } from "vitest";
import { bool } from "./type";
import { IntDefaultValue, singleValueOptionParse, StringDefaultValue } from "./singleValueOptionParse";

describe('bool', () => {
	const type = bool();
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
describe('int', () => {
	const type = singleValueOptionParse(IntDefaultValue, parseInt);
	test('should return int value if array with single value given', () => {
		expect(type(['1'])).toEqual(1);
	});

	test('should return default value if undefined value given', () => {
		expect(type(undefined)).toEqual(8080);
	});

	test('should throw exception if more than 1 value present', () => {
		expect(() => type(['8080', '8090'])).toThrowError('too many values');
	});

	test('should throw exception if no value present', () => {
		expect(() => type([])).toThrowError('too few values');
	});
});
describe('string', () => {
	const type = singleValueOptionParse(StringDefaultValue, (value) => value);
	test('should return string value if array with single value given', () => {
		expect(type(['/usr/local'])).toEqual('/usr/local');
	});

	test('should return default value if undefined value given', () => {
		expect(type(undefined)).toEqual('null');
	});

	test('should throw exception if more than 1 value present', () => {
		expect(() => type(['/usr/local', '/usr/logs'])).toThrowError('too many values');
	});
	test('should throw exception if no value present', () => {
		expect(() => type([])).toThrowError('too few values');
	});
});
