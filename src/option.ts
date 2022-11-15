export function option(flag, type) {
	return (args) => {
		let index = args.indexOf(`-${flag}`);
		if (index === -1)
			return type(undefined);
		let nextIndex = args.findIndex((v, i) => i > index && /^-[a-zA-Z-]+/.test(v));
		if (nextIndex === -1)
			nextIndex = args.length;
		return type(args.slice(index + 1, nextIndex));
	};
}
