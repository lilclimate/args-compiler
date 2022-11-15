export const IntDefaultValue = 8080;
export const StringDefaultValue = "null";
export function singleValueOptionParser(defaultValue: string | number, parse: Function): Function {
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
