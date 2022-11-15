export function parse(schema: any, args: string[]): any {
	const option = {};
	for (const key of Object.keys(schema)) {
		option[key] = schema[key](args);
	}
	return option;
}

