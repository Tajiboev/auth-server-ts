// import os from 'os';
// import cluster from 'cluster';
import { createServer } from 'https';
import app from './app';
import config from './config';

const server = createServer(config.server.ssl, app);

server.listen(config.server.port, () => {
	console.info(`\n🚀 Server listening on port ${config.server.port}\n`);
});

// TODO: implement multicore processing
// const clusterWorkerSize = os.cpus().length;

// if (clusterWorkerSize > 1) {
// 	if (cluster.isMaster) {
// 		for (let i = 0; i < clusterWorkerSize; i++) {
// 			cluster.fork();
// 		}

// 		cluster.on('exit', function (worker) {
// 			console.info('Worker', worker.id, ' has exitted.');
// 		});
// 	} else {
// 		const server = createServer(app);
// 		const port = config.server.port;

// 		server.listen(port, () => {
// 			console.info(`\n ⚡ Server listening on port ${port}, worker ${process.pid}`);
// 		});
// 	}
// } else {
// 	const server = createServer(app);
// 	const port = config.server.port;

// 	server.listen(port, () => {
// 		console.info(`\n ⚡ Server listening on port ${port}, worker ${process.pid}`);
// 	});
// }
