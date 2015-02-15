/**
 * Environment variables
 */

require('./lib/env');

/**
 * Module Dependencies
 */

var wildcard = require('socketio-wildcard')();
var Emitter = require('socket.io-emitter');
var Adapter = require('socket.io-redis');
var Socket = require('socket.io');
var parse = require('url').parse;
var Redis = require('redis');
var Roo = require('roo');

/**
 * Export `roo`
 */

var roo = module.exports = Roo(__dirname);

/**
 * Redis
 */

var url = parse(process.env.REDIS_URL);

/**
 * Pub / sub
 */

var sub = Redis.createClient(url.port, url.hostname, { detect_buffers: true });
var pub = Redis.createClient(url.port, url.hostname);

/**
 * Initialize the `emitter`
 */

var emitter = Emitter({ host: url.hostname, port: url.port });

/**
 * Initialize the `adapter`
 */

var adapter = Adapter({
  pubClient: pub,
  subClient: sub
});

/**
 * Get /
 */

roo.get('/', function *() {
  this.body = {
    'POST /:action': 'emit an event with a `payload`'
  }
});

/**
 * POST /:action
 */

roo.post('/:action', function *(next) {
  var action = this.params.action;

  if (action) {
    var payload = this.request.body || {};
    emitter.emit(action, payload);
  }

  this.body = 200;
})

/**
 * Listen
 */

roo.listen(function() {
  console.log('listening on port %s', this.address().port);
  socket = Socket(this, { adapter: adapter });
  socket.use(wildcard)
  socket.on('connection', function(client) {
    client.on('*', function(data) {
      data = data.data;
      var action = data[0];
      var payload = data[1];
      client.broadcast.emit(action, payload);
    })
  })
});
