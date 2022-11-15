import {describe, expect, test  } from "vitest";
import { option } from "./option";
describe('option', () => {
	const  opt = option('l', (values) => values);
	test('should fetch values follow by flag', () => { 
		expect(opt(['-l', 'a', 'b'])).toEqual(['a', 'b']);
	})	

	test('should only fetch values util next flag', () => { 
		expect(opt(['-l', 'a', 'b', '-p'])).toEqual(['a', 'b']);
	});

	test('should fetch empty array if no value given', () => {
		expect(opt(['-l'])).toEqual([]);	
	});

	test('should fetch undefined if no flag match', () => { 
		expect(opt(['-p', '8080'])).toBeUndefined();
	})

	test('should call type to handle values', () => { 
		let opt = option('l', (values) => 1);
		expect(opt(['-l', 'a', 'b'])).toEqual(1);
	});
});