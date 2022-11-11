import { parse } from "./parse";

export const parseArgs = (options: any, args: any) => {
	const keys = Object.keys(options);
	return keys.reduce((acc, key) => { 
		acc[key] = parse(options, key, args);
		return acc;
	}, {});	
};


