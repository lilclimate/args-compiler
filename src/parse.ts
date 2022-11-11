


export function parse(options: any, key: string, args: any) {
	const handlerMap = initHandlerMap();
	const parseHandle = handlerMap.get(options[key]);
	return parseHandle(args, key);
}
function parseString(args: any, key: string) {
	return getFlagValue(args, key);
}

function parseNumber(args: any, key: string) {
	return Number.parseInt(getFlagValue(args, key));
}

function parseBoolean(args: any, key: string): any {
	return args.includes(`-${key}`);
}

function getFlagValue(args: any, key: string) {
	const flagIndex = args.indexOf(`-${key}`);
	const value = args[flagIndex + 1];
	return value;
}

function initHandlerMap() {
	const map = new Map();
	map.set(Boolean, parseBoolean);
	map.set(Number, parseNumber);
	map.set(String, parseString);
	return map;
}