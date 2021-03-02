import express, {NextFunction, Request, Response} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import ErrorWithStatusCode from './Error';

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(morgan('dev'));

app.get('*', (req: Request, res: Response) => {
	res.status(200).json({message: 'Works fine? But why'});
});

app.use((req, res, next: NextFunction) => {
	const error = new ErrorWithStatusCode('Not found', 404);

	res.status(error.statusCode).json({
		message: error.message
	});

	next(error);
});

app.use((error: ErrorWithStatusCode, req: Request, res: Response, next: NextFunction) => {
	// may log error here
	res.status(error.statusCode | 500).json({message: error.message});
});

export default app;
