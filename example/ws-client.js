/**
 * Module Dependencies
 */

var Client = require('socket.io-client');

/**
 * Host
 */

var host = 'localhost:5000';

/**
 * Connect to `localhost:5000`
 */

var clientA = Client.connect('ws://' + host);

/**
 * Listen
 */

clientA.on('connect', function() {
  console.log('client A listening...');
  clientA.on('ws', function(payload) {
    console.log('client A: message from ws! with payload', payload);
  });

  var clientB = Client.connect('ws://' + host, { forceNew: true });
  clientB.on('connect', function() {
    console.log('client B listening...');
    console.log('client B emitting ws');
    clientB.emit('ws', { message: 'hi' })
  });
});
