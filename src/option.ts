export function option(flag: string, type: any) {
	return (args) => {
		const flagIndex = args.indexOf(`-${flag}`);
		if (flagIndex === -1)
			return type(undefined);
		let nextFlagIndex = args.findIndex((v, i) => i > flagIndex && /^-[a-zA-Z-]+/.test(v));
		nextFlagIndex = nextFlagIndex === -1 ? args.length : nextFlagIndex;
		return type(args.slice(flagIndex + 1, nextFlagIndex));
	};
}

