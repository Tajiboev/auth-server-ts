import dotenv from 'dotenv';

dotenv.config();

const server = {
	hostname: process.env.SERVER_HOSTNAME || 'localhost',
	port: process.env.SERVER_PORT || 3001
};

const MONGO_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };

const mongo = {
	password: process.env.MONGO_PASSWORD,
	dbname: process.env.MONGO_DBNAME,
	options: MONGO_OPTIONS,
	url: `mongodb+srv://Mukhammadjon:${process.env.MONGO_PASSWORD}@authcluster.9oliw.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`
};

const jwt = {
	secret: process.env.JWT_KEY || 'superencryptedsecret',
	options: {
		issuer: process.env.JWT_ISSUER || 'issuerName',
		expiresIn: '1d'
	}
};

const config = {
	server,
	mongo,
	jwt
};

export default config;
