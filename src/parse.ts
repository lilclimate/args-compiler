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
	const flagIndex = getFlagIndex(args, key);
	if (flagIndex + 1 < args.length && !args[flagIndex + 1].startsWith('-'))
		throw new Error('invalid argument');
	return flagIndex !== -1;
}

function getFlagValue(args: any, key: string) {
	const flagIndex = getFlagIndex(args, key);
	const value = args[flagIndex + 1];
	return value;
}

function getFlagIndex(args: any, key: string) {
	return args.indexOf(`-${key}`);
}

function initHandlerMap() {
	const map = new Map();
	map.set(Boolean, parseBoolean);
	map.set(Number, parseNumber);
	map.set(String, parseString);
	return map;
}