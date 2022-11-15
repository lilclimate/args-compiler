import { unary } from "./parse";

export function bool() {
	return (args) => {
		if (args === undefined)
			return false;
		if (args.length === 0)
			return true;
	};
}
export function int(defaultValue = 0) {
	return unary(defaultValue, parseInt);
}
export function string(defaultValue = '') {
	return unary(defaultValue, (value) => value);
}
