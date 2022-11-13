
export function parse(options: any, key: string, args: any) {
	const handlerMap = initHandlerMap();
	const parseHandle = handlerMap.get(options[key]);
	return parseHandle(args, key);
}


// TODO: 待下沉parseNumber、parseBoolean、parseString的实现与测试逻辑
const defaultStringValue = "";
function parseString(args: any, key: string) {
	const flagIndex = getFlagIndex(args, key);
	if (flagIndex === -1) return defaultStringValue;
	if (flagIndex + 2 < args.length && !args[flagIndex + 2].startsWith('-'))
		throw new Error('too many argument');
	return getFlagValue(args, key);
}


const defaultIntValue = 0;
function parseNumber(args: any, key: string) {
	const flagIndex = getFlagIndex(args, key);
	if (flagIndex === -1) return defaultIntValue;
	if (flagIndex + 1 === args.length || args[flagIndex + 1].startsWith('-')) throw new Error("insufficient argument");
	if (flagIndex + 2 < args.length && !args[flagIndex + 2].startsWith('-'))
		throw new Error('too many argument');
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