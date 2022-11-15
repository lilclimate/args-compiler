import {describe, expect, it  } from "vitest";
describe('Args parser', () => {
	it.skip('should parse multi options', () => {
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
});

function option(flag ,type) { 

}
function bool(): any {
}

function int(): any {
}

function string(): any {
}

function parse(schema, args) {
	
}



