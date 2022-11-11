import {test, expect} from "vitest";
import { parseArgs } from "./index";

test('should set boolean options to true if flag present', () => {
	const options = {
		l: Boolean
	};	
	const args = parseArgs(options, ["-l"]);
	expect(args).toEqual({l: true});
});

test('should set port options to 8080 if pass 8080 present', () => {
	const options = {
		p: Number,
	};	
	const args = parseArgs(options, ["-p", "8080"]);
	expect(args).toEqual({p: 8080});
});

test('should set path options to 8080 if pass path present', () => {
	const options = {
		d: String,
	};	
	const args = parseArgs(options, ["-d", "/usr/logs"]);
	expect(args).toEqual({d: "/usr/logs"});
});

test('happy path1', () => {
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

test.todo('happy path2', () => {
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

// done:
// single Option: 
// -l
// -p 8080
// -d /usr/logs
// multiple options: -l -p 8080 -d /usr/logs 

//TODO: 
// sad path
// - bool:  -l t / -l f
// - int -p / -p 8080 9090
// - string: -d / -d /usr/logs /urs/logs
// default value
// - bool: false
// - int: 0
// - string: ""
