import {test, expect} from "vitest";
import { parseArgs } from "./index";

// -l -> true
test('should set boolean options to true if flag present', () => {
	const options = {
		l: Boolean
	};	
	const args = parseArgs(options, ["-l"]);
	expect(args).toEqual({l: true});
});

//TODO: -p -> 8080

//TODO: -d -> /usr/logs

//TODO: -l -p 8080 -d /usr/logs
test.todo('happy path', () => {
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

//TODO: sad path
// -l true
// -p 8080 9090