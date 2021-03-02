import dotenv from 'dotenv';

dotenv.config();

const server = {
	hostname: process.env.SERVER_HOSTNAME || 'localhost',
	port: process.env.SERVER_PORT || 3001
};

const mongo = {
	password: process.env.MONGO_PASSWORD,
	dbname: process.env.MONGO_DBNAME
};

const jwt = {
	key: process.env.JWT_KEY
};

const config = {
	server,
	mongo,
	jwt
};

export default config;
