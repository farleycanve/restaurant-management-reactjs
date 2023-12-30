const removeUndefinedKeys = obj => {
	for (const key in obj) {
		if (obj.hasOwnProperty(key) && (obj[key] === undefined || obj[key] === null || obj[key] === '')) {
			delete obj[key];
		}
	}
	return obj;
};

export default removeUndefinedKeys;
