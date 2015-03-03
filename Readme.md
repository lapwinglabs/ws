# WS

Simple Pusher-like clone. Ready to be deployed to Heroku or Dokku.

## Usage

### Push over HTTP

Messenger:

```bash
curl http://ws.lapwinglabs.com/action \
  -H "Content-Type: application/json" \
  -d '{ "k": "v" }'
```

Client:

```js
var Client = require('socket.io-client');
var client = Client.connect('ws://ws.lapwinglabs.com');
var assert = require('assert');

client.on('action', function(payload) {
  assert(payload.k == 'v');
  console.log(payload);
})
```

### Push over Websockets

Messenger:

```js
var Messenger = require('socket.io-client');
var messenger = Messenger.connect('ws://ws.lapwinglabs.com');

messenger.emit('action', { k: v });
```

Client:

```js
var Client = require('socket.io-client');
var client = Client.connect('ws://ws.lapwinglabs.com');
var assert = require('assert');

client.on('action', function(payload) {
  assert(payload.k == 'v');
  console.log(payload);
})
```

## TODO

- authentication
