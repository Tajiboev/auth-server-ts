const info = (namespace: string, message: string, object?: any): void => {
	if (object) {
		console.info(`\n➡️  [${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
	} else {
		console.info(`\n➡️  [${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
	}
};

const error = (namespace: string, message: string, object?: any): void => {
	if (object) {
		console.error(`\n🆘 [${getTimeStamp()}] [ERROR] [${namespace}] ${message}`, object);
	} else {
		console.error(`\n🆘 [${getTimeStamp()}] [ERROR] [${namespace}] ${message}`);
	}
};

const getTimeStamp = (): string => {
	return new Date().toLocaleString();
};

export default {
	info,
	error
};
