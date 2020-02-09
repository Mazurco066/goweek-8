module.exports = (...fns) => initialParameter => {
	const normalizeParameter = parameter => {
		let p = parameter || {};
		if (p.status === undefined) {
			p = { ...p, status: { code: 200, message: '' } };
		}
		if (p.status.code === undefined) {
			p = { ...p, status: { code: 200, ...p.status } }
		}
		if (p.status.message === undefined) {
			p = { ...p, status: { message: '', ...p.status } }
		}
		return p;
	}
	
    return fns.reduce(async (ac, f) => {
		const p = normalizeParameter(await ac);
		if (![200, 201].includes(p.status.code))
			return p;
		return f(p)
	}, initialParameter);
};
