const { spawn } = require('node:child_process');
const path = require('node:path');
const jsonServer = require('json-server');

const root = path.resolve(__dirname, '..');
const api = jsonServer.create();
api.use(jsonServer.defaults());
api.use(jsonServer.bodyParser);
api.use(jsonServer.router(path.join(root, 'bd.json')));

const server = api.listen(3000, '127.0.0.1', () => {
  console.log('Données : http://localhost:3000/coques');
  const angular = spawn(process.execPath, [
    path.join(root, 'node_modules/@angular/cli/bin/ng.js'),
    'serve', ...process.argv.slice(2)
  ], { cwd: root, stdio: 'inherit' });

  angular.on('error', error => {
    console.error(error.message);
    server.close(() => process.exit(1));
  });
  angular.on('exit', code => server.close(() => process.exit(code ?? 0)));
  for (const signal of ['SIGINT', 'SIGTERM']) {
    process.on(signal, () => {
      angular.kill(signal);
      server.close();
    });
  }
});

server.on('error', error => {
  console.error(error.code === 'EADDRINUSE'
    ? 'Le port 3000 est déjà utilisé. Arrêtez le serveur existant puis relancez npm start, ou utilisez npm run start:app si les données sont déjà servies.'
    : error.message);
  process.exitCode = 1;
});
