import { describe, expect, test } from "vitest";
import { option } from "./option";

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

