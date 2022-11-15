import {describe, expect, test  } from "vitest";
import { parse } from "./args";
import { option } from "./option";
import { bool } from "./type";
import { IntDefaultValue, singleValueOptionParse, StringDefaultValue } from "./singleValueOptionParse";

//	happy path
//	should parse multi options		  
//	TODO: should parse multi options in list
// 	should call parse in schema to build option
//	should fetch values follow by flag
//	should only fetch values util next flag
//	should fetch empty array if no value given
//	should fetch undefined if no flag match
//	should call type to handle values
//	should return true if empty array given -> (bool -l && default value)
// 	should return false if undefined given
//	should return int value if array with single value given ->  int -p 8080
//	should return string value if array with single value given -> string -d /usr/logs
//	sad path
//	bool -l t / -l t f
//  should throw exception if more than 1 value present/ should throw exception if no value present
//		-> int -p / -p 8080 8081
//		-> string -d / -d /usr/local /usr/logs
//	default
//	bool:true
//	should return default value if undefined value given -> int:0	
//	should return default value if undefined value given -> string:""

describe('args', () => {
	test('should parse multi options', () => { 
		let schema = {
			logging: option('l', bool()), 
			int: option('p', singleValueOptionParse(IntDefaultValue, parseInt)),
			string: option('d', singleValueOptionParse(StringDefaultValue, (value) => value)),
		};
		expect(parse(schema, ['-l', '-p', '8080', '-d', '/usr/logs'])).toEqual({
			logging: true,
			int: 8080,
			string: "/usr/logs"
		});
	});
	test.skip('should parse multi options in list', () => { 
		let schema = {
			logging: option('l', bool()), 
			int: option('p', singleValueOptionParse(IntDefaultValue, parseInt)),
			string: option('d', singleValueOptionParse(StringDefaultValue, (value) => value)),
		};
		expect(parse(schema, ['-g', 'this', 'is', 'a', 'list', 'd', '1', '2', '-3', '5'])).toEqual({
			string: ['this', 'is', 'a', 'list'],
			int: [1, 2, -3, 5],
		});
	})
});

describe('parse', () => {
	test('should call parse in schema to build option', () => { 
		let schema = {
			logging: (args) => args,
			int: (args) => args,
			string: (args) => args
		};
		expect(parse(schema, ['args'])).toEqual({logging: ['args'], int: ['args'], string: ['args']});
	});
});


