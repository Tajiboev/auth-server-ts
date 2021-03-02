const port = 3000;
import spdy from 'spdy';
import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();

app.get('*', (req, res) => {
	res.status(200).json({message: 'ok'});
});
const options = {
	key: fs.readFileSync(__dirname + '/ssl/privateKey.key'),
	cert: fs.readFileSync(__dirname + '/ssl/certificate.crt')
};
console.log(options);
spdy.createServer(options, app).listen(port, function () {
	console.log('Listening on port: ' + port + '.');
});
