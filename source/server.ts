import { createServer } from 'https';
import { serverConfig } from './config';
import app from './app';

const server = createServer(serverConfig.ssl, app);

server.listen(serverConfig.port, () => {
	console.info(`\n🚀 Server listening on port ${serverConfig.port}\n`);
});
