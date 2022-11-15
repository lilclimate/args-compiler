import {describe, expect, test  } from "vitest";
import { bool, string, int } from "./type";
describe('bool', () => {
	const type = bool();	
	test('should return true if empty array given', () => {
		expect(type([])).toBeTruthy();
	});	

	test('should return false if undefined given', () => { 
		expect(type(undefined)).toBeFalsy();
	});
});

describe('int', () => {
	const type = int(8080);
	test('should return int value if array with single value given', () => { 
		expect(type(['1'])).toEqual(1);			
	});	

	test('should return default value if undefined value given', () => { 
		expect(type(undefined)).toEqual(8080);			
	});	

	test('should throw exception if more than 1 value present', () => { 
		expect(() => type(['1', '2'])).toThrowError('too many values');
	});

	test('should throw exception if no value present', () => { 
		expect(() => type([])).toThrowError('too few values');
	})

});

describe('string', () => {
	const type = string('default');
	test('should return string value if array with single value given', () => { 
		expect(type(['/usr/logs'])).toEqual('/usr/logs');
	});	

	test('should return default value if undefined value given', () => { 
		expect(type(undefined)).toEqual('default');
	});

	test('should throw exception if more than 1 value present', () => { 
		expect(() => type(['/usr/logs', '/usr/local'])).toThrowError('too many values');
	});

	test('should throw exception if no value present', () => { 
		expect(() => type([])).toThrowError('too few values');
	})
});