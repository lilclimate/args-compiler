export function parse(options: any, key: string, args: any) {
	let value;
	if (options[key] === Boolean) {
		value = parseBoolean(args, key);
	}

	if (options[key] === Number) {
		value = parseNumber(args, key, value);
	}

	if (options[key] === String) {
		value = parseString(args, key, value);
	}
	return value;
}
function parseString(args: any, key: string, value: any) {
	const flagIndex = args.indexOf(`-${key}`);
	value = args[flagIndex + 1];
	return value;
}
function parseNumber(args: any, key: string, value: any) {
	const flagIndex = args.indexOf(`-${key}`);
	value = Number.parseInt(args[flagIndex + 1]);
	return value;
}
function parseBoolean(args: any, key: string): any {
	return args.includes(`-${key}`);
}
