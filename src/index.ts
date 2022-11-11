import { parse } from "./parse";

export const parseArgs = (options: any, args: any) => {
	const keys = Object.keys(options);
	const key = keys[0];

	const value = parse(options, key, args);
	
	return {[key]: value};	
};


