import {test, expect} from "vitest";
import { parseArgs } from "./index";

// single Option: 
// -l
// -p 8080
// -d /usr/logs
// multiple options: -l -p 8080 -d /usr/logs 

// 
// sad path
// - bool:  -l t / -l f
// - int -p / -p 8080 9090
// TODO: - string: -d / -d /usr/logs /urs/logs
// default value
// - bool: false
// TODO: - int: 0
// TODO: - string: ""

test('should set boolean options to true if flag present', () => {
	const options = {
		l: Boolean
	};	
	const args = parseArgs(options, ["-l"]);
	expect(args).toEqual({l: true});
});

test('should not accept extra argument for boolean option', () => { 
	const options = {
		l: Boolean
	};	
	expect(() => parseArgs(options, ["-l", "t"])).toThrowError("invalid argument");	
});

test('should set default value to false if option not preset', () => { 
	const options = {
		l: Boolean
	};	
	const args = parseArgs(options, []);
	expect(args).toEqual({l: false});
});

test('should set port options to 8080 if pass 8080 present', () => {
	const options = {
		p: Number,
	};	
	const args = parseArgs(options, ["-p", "8080"]);
	expect(args).toEqual({p: 8080});
});

test('should not accept extra argument for single value option', () => {
	const options = {
		p: Number,
	};	
	expect(() => parseArgs(options, ["-p", "8080", "8081"])).toThrowError("too many argument");
});

test('should not accept insufficient argument for single value option', () => {
	const options = {
		p: Number,
	};	
	expect(() => parseArgs(options, ["-p", "-l"])).toThrowError('insufficient argument');
	expect(() => parseArgs(options, ["-p"])).toThrowError('insufficient argument');
});

test('should set path options to /user/logs if pass path present', () => {
	const options = {
		d: String,
	};	
	const args = parseArgs(options, ["-d", "/usr/logs"]);
	expect(args).toEqual({d: "/usr/logs"});
});

test('should pass multi options1', () => {
	const options = {
		l: Boolean,
		p: Number,
		d: String,
	};	

	const args = parseArgs(options, ["-l", "-p", "8080", "-d", "/usr/logs"]);
	expect(args).toEqual({
		l: true,
		p: 8080,
		d: "/usr/logs",
	});
});

test.todo('should pass multi options2', () => {
	const options = {
		l: Boolean,
		p: Number,
		d: String,
	};	

	const args = parseArgs(options, ["-g", "this", "is", "a", "list", "-d", "1", "2", "-4", "5"]);
	expect(args).toEqual({
		g: ["this", "is", "a", "list"],
		d: [1, 2, -4, 5],
	});
});



