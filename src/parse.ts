export function parse(schema, args) {
	let option = {};
	for (let key of Object.keys(schema)) {
		option[key] = schema[key](args);
	}
	return option;
}
