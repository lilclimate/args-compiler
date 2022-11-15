import {describe, expect, test  } from "vitest";
import { option, bool, string, int, parse } from "./parse";
describe('Args parser', () => {
	test('should parse multi options', () => {
		let schema = {
			logging: option('l', bool()),
			directory: option('d', string()),
			port: option('p', int())
		}

		let options = parse(schema, ['-l', '-p', '8080', '-d', '/usr/logs']);
		expect(options).toEqual({
			logging: true,
			port: 8080,
			directory: '/usr/logs'
		});
	});

	describe('parse', () => {
		test('should call parse in schema to build option', () => {
			let schema = {
				logging: (args) => args,
				port: (args) => args
			};

			let option = parse(schema, ["args"]);
			expect(option).toEqual({
				logging: ['args'],
				port: ['args'],
			});
		});	
	});

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
});


