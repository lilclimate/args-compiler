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
		test('should fetch values follow by flag', () => { 
			let opt = option('l', (values) => values);
			expect(opt(['-l', 'a', 'b'])).toEqual(['a', 'b']);
		})	
	});
});

function option(flag ,type) { 
	return (args) => { 
		let index = args.indexOf(`-${flag}`);
		return args.slice(index + 1);
	}	
}
function bool(): any {
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



