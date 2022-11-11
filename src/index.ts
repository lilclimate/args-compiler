export const parseArgs = (options: any, args: any) => {
	const keys = Object.keys(options);
	const key = keys[0];

	let value;
	if (options[key] === Boolean) {
		value = args.includes(`-${key}`);
	}

	if (options[key] === Number) { 
		const flagIndex = args.indexOf(`-${key}`);
		value = Number.parseInt(args[flagIndex + 1]);
	}

	
	
	return {[key]: value};	
};

