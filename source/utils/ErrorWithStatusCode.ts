export interface IError extends Error {
	statusCode: number;
	message: string;
	errorObject?: Error;
}

class ErrorWithStatusCode extends Error implements IError {
	statusCode: number;
	errorObject?: Error;
	constructor(statusCode: number, message: string, errorObject?: Error) {
		super(message);
		this.statusCode = statusCode;
		this.errorObject = errorObject;
	}
}

export default ErrorWithStatusCode;
