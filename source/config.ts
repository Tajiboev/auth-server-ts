import dotenv from 'dotenv';
import fs from 'fs';
import crypto from 'crypto';

dotenv.config();

const MONGO_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };

const mongo = {
	password: process.env.MONGO_PASSWORD,
	dbname: process.env.MONGO_DBNAME,
	options: MONGO_OPTIONS,
	url: `mongodb+srv://Mukhammadjon:${process.env.MONGO_PASSWORD}@authcluster.9oliw.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`
};

const server = {
	hostname: process.env.SERVER_HOSTNAME || 'localhost',
	port: process.env.SERVER_PORT || 5000,
	ssl: {
		key: fs.readFileSync(__dirname + '/ssl/privateKey.key'),
		cert: fs.readFileSync(__dirname + '/ssl/certificate.crt')
	}
};

const jwt = {
	access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET || 'supersecretkey',
	common_token_secret: process.env.JWT_COMMON_TOKEN_SECRET || 'supersecretrefreshkey'
};

const config = {
	server,
	mongo,
	jwt
};

export default config;
