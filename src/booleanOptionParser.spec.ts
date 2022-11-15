import { describe, expect, test } from "vitest";
import { booleanOptionParser } from "./booleanOptionParser";

describe('bool', () => {
	const type = booleanOptionParser();
	test('should return true if empty array given', () => {
		expect(type([])).toBeTruthy();
	});

	test('should return false if undefined given', () => {
		expect(type(undefined)).toBeFalsy();
	});

	test('should throw error if not empty array given', () => {
		expect(() => type(['true'])).toThrowError("too many values");
	});
});


