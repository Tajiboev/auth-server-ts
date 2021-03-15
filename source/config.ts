import dotenv from 'dotenv';

dotenv.config();

const server = {
	hostname: process.env.SERVER_HOSTNAME || 'localhost',
	port: process.env.SERVER_PORT || 3001
};

const MONGO_OPTIONS = {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true};

const mongo = {
	password: process.env.MONGO_PASSWORD,
	dbname: process.env.MONGO_DBNAME,
	options: MONGO_OPTIONS,
	url: `mongodb://Mukhammadjon:${process.env.MONGO_PASSWORD}@authcluster-shard-00-00.9oliw.mongodb.net:27017,authcluster-shard-00-01.9oliw.mongodb.net:27017,authcluster-shard-00-02.9oliw.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-ghv7yq-shard-0&authSource=admin&retryWrites=true&w=majority`,
	url2: `mongodb+srv://Mukhammadjon:${process.env.MONGO_PASSWORD}@authcluster.9oliw.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`
};

const jwt = {
	key: process.env.JWT_KEY || 'superencryptedsecret',
	issuer: process.env.JWT_ISSUER || 'issuerName'
};

const config = {
	server,
	mongo,
	jwt
};

export default config;
