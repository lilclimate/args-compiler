export const parseArgs = (options: any, args: any) => {
	const keys = Object.keys(options);
	const key = keys[0];
	const value = args.includes(`-${key}`);
	return {[key]: value};	
};

