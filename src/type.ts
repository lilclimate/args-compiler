export function bool(defaultValue: boolean = true): Function {
	return (args): boolean => {
		if (!args)
			return false;
		if (args.length > 0)
			throw new Error("too many values");
		if (args.length === 0)
			return defaultValue;
		return false;
	};
}
export function int(defaultValue: number = 8080): Function {
	const parse = parseInt;
	return unary(defaultValue, parse);
}
export function string(defaultValue: string = "null"): Function {
	const parse = (value) => value;
	return unary(defaultValue, parse);
}
function unary(defaultValue: string | number, parse: Function): Function {
	return (args): string | number => {
		if (!args)
			return defaultValue;
		if (args.length === 0)
			throw new Error("too few values");
		if (args.length > 1)
			throw new Error("too many values");
		return parse(args[0]);
	};
}
