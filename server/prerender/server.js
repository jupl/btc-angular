var prerender = require('prerender');

var server = prerender({
  workers: process.env.PHANTOM_CLUSTER_NUM_WORKERS,
  iterations: process.env.PHANTOM_WORKER_ITERATIONS || 10,
  phantomArguments: ['--load-images=false', '--ignore-ssl-errors=true'],
  phantomBasePort: process.env.PHANTOM_CLUSTER_BASE_PORT,
  messageTimeout: process.env.PHANTOM_CLUSTER_MESSAGE_TIMEOUT
});

server.use(prerender.blacklist());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());

server.start();
