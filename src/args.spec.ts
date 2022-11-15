import {describe, expect, test  } from "vitest";

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
	const type = bool();
	test('should return true if empty array given', () => { 
		expect(type([])).toBeTruthy();
	})

	test('should return false if undefined given', () => { 
		expect(type(undefined)).toBeFalsy();
	});

	test('should throw error if not empty array given', () => { 
		expect(() => type(['true'])).toThrowError("too many values");
	})
})

describe('int', () => {
	const type = int();	
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
	})
});

describe('string', () => {
	const type = string();
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
	})
});

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

function bool(defaultValue: boolean = true): Function {
	return (args): boolean => {
		if (!args) return false;
		if (args.length > 0) throw new Error("too many values");
		if (args.length === 0) return defaultValue;
		return false;
	 };
}

function int(defaultValue: number= 8080): Function {
	const parse = parseInt;
	return unary(defaultValue, parse)	
}

function string(defaultValue: string = "null"): Function {
	const parse = (value) => value;
	return unary(defaultValue, parse)	
}


function unary(defaultValue: string|number, parse: Function): Function {
	return (args): string|number => {
		if (!args)
			return defaultValue;
		if (args.length === 0) throw new Error("too few values");
		if (args.length > 1) throw new Error("too many values");
		return parse(args[0]);
	};
}

