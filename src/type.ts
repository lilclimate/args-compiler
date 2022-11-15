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

export function unary(defaultValue: number | string, parse) {
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
