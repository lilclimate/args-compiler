const map = new Map();
map.set(Boolean, parseBoolean);
map.set(Number, parseNumber);
map.set(String, parseString);

export function parse(options: any, key: string, args: any) {
	const parseHandle = map.get(options[key]);
	return parseHandle(args, key);
}
function parseString(args: any, key: string) {
	const flagIndex = args.indexOf(`-${key}`);
	const value = args[flagIndex + 1];
	return value;
}
function parseNumber(args: any, key: string) {
	const flagIndex = args.indexOf(`-${key}`);
	const value = Number.parseInt(args[flagIndex + 1]);
	return value;
}
function parseBoolean(args: any, key: string): any {
	return args.includes(`-${key}`);
}
