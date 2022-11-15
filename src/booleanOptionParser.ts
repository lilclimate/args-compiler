

export function booleanOptionParser(defaultValue: boolean = true): Function {
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
