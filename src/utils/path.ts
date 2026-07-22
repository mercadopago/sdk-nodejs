function encodePathParam(value: string | number): string {
	return encodeURIComponent(value.toString());
}

export { encodePathParam };
