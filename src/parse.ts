export function option(flag, type) {
	return (args) => {
		let index = args.indexOf(`-${flag}`);
		if (index === -1)
			return type(undefined);
		let nextIndex = args.findIndex((v, i) => i > index && /^-[a-zA-Z-]+/.test(v));
		if (nextIndex === -1)
			nextIndex = args.length;
		return type(args.slice(index + 1, nextIndex));
	};
}
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
function unary(defaultValue: number | string, parse) {
	return (args) => {
		if (!args)
			return defaultValue;
		if (args.length === 0)
			throw new Error("too few values");
		if (args.length > 1)
			throw new Error("too many values");
		return parse(args[0]);
	};
}
export function parse(schema, args) {
	let option = {};
	for (let key of Object.keys(schema)) {
		option[key] = schema[key](args);
	}
	return option;
}
