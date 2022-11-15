import {describe, expect, test  } from "vitest";
describe('Args parser', () => {
	test.skip('should parse multi options', () => {
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
		test('should return true if empty array given', () => {
			let type = bool();	
			expect(type([])).toBeTruthy();
		});	
	});
});

function option(flag ,type) { 
	return (args) => { 
		let index = args.indexOf(`-${flag}`);
		if (index=== -1) return undefined;
		let nextIndex = args.findIndex((v, i) => i > index && /^-[a-zA-Z-]+/.test(v) );
		if (nextIndex === -1) nextIndex = args.length; 
		return type(args.slice(index + 1, nextIndex));
	}	
}
function bool() {
	return (args) => { 
		if (args.length === 0) return true;
	};
}

function int(): any {
}

function string(): any {
}

function parse(schema, args) {
	let option = {};	
	for (let key of Object.keys(schema)) { 
		option[key] = schema[key](args);
	}	
	return option;
}



