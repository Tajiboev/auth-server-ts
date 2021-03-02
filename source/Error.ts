interface IError extends Error {
	statusCode: number;
}

class ErrorWithStatusCode extends Error implements IError {
	statusCode: number;
	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
	}
}

export default ErrorWithStatusCode;
