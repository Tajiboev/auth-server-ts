import dotenv from 'dotenv';
import fs from 'fs';

const config = dotenv.config();
if (config.error || !config.parsed) throw config.error;
const env = config.parsed;

const MONGO_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };

const mongo = {
	password: env.MONGO_PASSWORD,
	dbname: env.MONGO_DBNAME,
	options: MONGO_OPTIONS,
	url: `mongodb+srv://dbadmin:${env.MONGO_PASSWORD}@cluster0.9oliw.mongodb.net/${env.MONGO_DBNAME}?retryWrites=true&w=majority`
};

const serverConfig = {
	hostname: env.SERVER_HOSTNAME || 'localhost',
	port: env.SERVER_PORT || 5000,
	ssl: {
		key: fs.readFileSync(__dirname + '/ssl/privateKey.key'),
		cert: fs.readFileSync(__dirname + '/ssl/certificate.crt')
	}
};

const jwtSecrets = {
	token_secret: env.JWT_ACCESS_TOKEN_SECRET || 'supersecretkey'
};

export { serverConfig, mongo, jwtSecrets };
