const fnc = (number) => {
	return new Promise((resolve, reject) => {
		if (number > 10) reject(new Error('number error'));
		resolve('works fine');
	});
};

const another = async (number) => {
	try {
		const value = await fnc(number);
		console.log(value);
	} catch (e) {
		console.log(e);
	}
};

another(12);
