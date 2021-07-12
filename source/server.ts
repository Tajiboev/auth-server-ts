import { createServer } from 'https';
import { serverConfig, mongo } from './config';
import app from './app';
import mongoose, { connection, connect } from 'mongoose';

const server = createServer(serverConfig.ssl, app);

server.listen(serverConfig.port, () => {
	console.info(`Server listening on port ${serverConfig.port}`);
});
connect(mongo.url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
})
	.then((r) => console.info(r))
	.catch((e) => console.error(e));

const stopServer = async () => {
	server.close();
	await mongoose.disconnect();
	await connection.close();
	process.exit(0);
};

connection.on('connected', () => {
	console.info('Mongoose connected');
});

connection.on('error', (err) => {
	console.error(err.message);
});

connection.on('disconnected', () => {
	console.info('Mongoose disconnected');
});

process.on('SIGINT', stopServer);
process.on('SIGTERM', stopServer);
