import {describe, expect, test  } from "vitest";

//	happy path
//	TODO: should parse multi options		  
//	TODO: should parse multi options in list
// 	should call parse in schema to build option
//	should fetch values follow by flag
//	should only fetch values util next flag
//	should fetch empty array if no value given
//	should fetch undefined if no flag match
//	should call type to handle values
//	should return true if empty array given
// 	TODO: should return false if undefined given
//	TODO: bool -l	
//	TODO: int -p 8080
//	TODO: string -d /usr/logs
//	sad path
//	TODO:	bool -l t / -l t f / undefined
//	TODO: int -p / -p 8080 8081
//	TODO:	string -d / -d /usr/local /usr/logs
//	default
//	bool:true
//	TODO:	int:0	
//	TODO: string:""

describe('args', () => {
	test.skip('should parse multi options', () => { 
		let schema = {
			logging: option('l', bool()), 
			int: option('p', int()),
			string: option('d', string()),
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
			int: option('p', int()),
			string: option('d', string()),
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

describe('option', () => {

	const opt = option('d', (value) => value);
	test('should fetch values follow by flag', () => {
		expect(opt(['-d', 'a', 'b'])).toEqual(['a', 'b']);	
	});	

	test('should only fetch values util next flag', () => { 
		expect(opt(['-d', 'a', 'b', '-p'])).toEqual(['a', 'b']);	
	});

	test('should fetch empty array if no value given', () => {
		expect(opt(['-d'])).toEqual([]);
	 });

	test('should fetch undefined if no flag match', () => { 
		expect(opt(['-p', '8080'])).toBeUndefined();
	});

	test('should call type to handle values', () => { 
		const opt = option('d', (value) => false);
		expect(opt(['-d', '/usr/log'])).toBeFalsy();
		expect(opt(['-p', '8080'])).toBeFalsy();
	});
});

describe('bool', () => { 
	test('should return true if empty array given', () => { 
		const type = bool();
		expect(type([])).toBeTruthy();
	})
})

function parse(schema: any, args: string[]): any {
	const option = {};
	for (const key of Object.keys(schema)) {
		option[key] = schema[key](args);	
	}	
	return option;
}


function option(flag: string, type: any) {
	return (args) => { 
		const flagIndex = args.indexOf(`-${flag}`);
		if (flagIndex === -1) return type(undefined); 
		let nextFlagIndex = args.findIndex((v, i) => i > flagIndex && /^-[a-zA-Z-]+/.test(v))
		nextFlagIndex = nextFlagIndex === -1 ? args.length : nextFlagIndex;
		return type(args.slice(flagIndex + 1, nextFlagIndex));
	};
}

function bool(): Function {
	return (args): boolean => {
		if (args.length === 0) return true;
		return false;
	 };
}

function int(): any {
	
}

function string(): any {
	
}


