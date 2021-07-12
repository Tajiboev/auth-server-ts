import { createServer } from 'https';
import { serverConfig, mongo } from './config';
import app from './app';
import mongoose from 'mongoose';

const server = createServer(serverConfig.ssl, app);

server.listen(serverConfig.port, () => {
	console.info(`Server listening on port ${serverConfig.port}`);
});
mongoose
	.connect(mongo.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then((r) => console.info('Mongoose connected'))
	.catch((e) => console.error(e));

const stopServer = async () => {
	server.close();
	await mongoose.disconnect();
	await mongoose.connection.close();
	console.info('Server shut down!');
	process.exit(0);
};

process.on('SIGINT', stopServer);
process.on('SIGTERM', stopServer);
