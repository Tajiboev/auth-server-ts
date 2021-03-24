import { connect, connection } from 'mongoose';
import config from './config';

connect(config.mongo.url, config.mongo.options)
	.then((result) => {
		console.info('\n✅ Connected to the database\n');
	})
	.catch((error) => {
		console.error('\n❌ Could not connect to the database \n', error);
	});

connection.on('connected', () => {
	console.info('Mongoose connected');
});

connection.on('error', (err) => {
	console.error(err.message);
});

connection.on('disconnected', () => {
	console.info('Mongoose disconnected');
});

process.on('SIGINT', async () => {
	await connection.close();
	process.exit(0);
});
