import {describe, expect, test  } from "vitest";

//	happy path
//	TODO: bool -l	
//	TODO: int -p 8080
//	TODO: string -d /usr/logs
//	TODO: should parse multi options		  
//	TODO: should parse multi options in list
//	sad path
//	TODO:	bool -l t / -l t f
//	TODO: int -p / -p 8080 8081
//	TODO:	string -d / -d /usr/local /usr/logs
//	default
//	TODO:	bool:true
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

function parse(schema: any, args: string[]): any {
}


function option(flag: string, type: any) {
}

function bool(): any {
	
}

function int(): any {
	
}

function string(): any {
	
}


