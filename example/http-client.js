/**
 * Module Dependencies
 */

var Client = require('socket.io-client');
var superagent = require('superagent');

/**
 * Host
 */

var host = process.env.HOST || 'localhost:5000';

/**
 * Connect to `localhost:5000`
 */

var client = Client.connect('ws://' + host);

/**
 * Listen
 */

client.on('connect', function() {
  console.log('client listening...');
  client.on('http', function(payload) {
    console.log('message from http! with payload', payload);
  });

  console.log('posting to /http');
  superagent
    .post('http://' + host + '/http')
    .send({ message: 'hi!' })
    .end(function(err, res) {
      if (err) throw err;
      else if (!res.ok) throw new Error('status code error: ' + res.status);
      console.log('posted to /http');
    })
})
