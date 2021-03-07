interface IError extends Error {
	statusCode: number;
}

class ErrorWithStatusCode extends Error implements IError {
	statusCode: number;
	errorObject?: Error;
	constructor(message: string, statusCode: number, errorObject?: Error) {
		super(message);
		this.statusCode = statusCode;
		this.errorObject = errorObject;
	}
}

export default ErrorWithStatusCode;
