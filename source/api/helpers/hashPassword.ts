import bcryptjs from 'bcryptjs';

const hashPassword = (password: string): Promise<string | Error> => {
	return new Promise((resolve, reject) => {
		bcryptjs.hash(password, 10, (hashError, hashedPassword) => {
			if (hashError) {
				reject(hashError);
			} else {
				resolve(hashedPassword);
			}
		});
	});
};

export default hashPassword;
