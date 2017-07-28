// server.js
const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

// sends data to all clients 
function broadcast(data) {
  for (let client of wss.clients) {
    client.send(data);
  }
}

// random color todo 
function randomColor() {

}

function handleMessage(data) {
  let parsedData = JSON.parse(data);

  switch (parsedData.type) {
    case 'postMessage':
      parsedData.id = uuidv4();
      parsedData.username = parsedData.username || "Anonymous";
      parsedData.type = "incomingMessage"
      broadcast(JSON.stringify(parsedData));
      break;
    case 'postNotification':
      parsedData.id = uuidv4();
      parsedData.type = "incomingNotification"
      broadcast(JSON.stringify(parsedData));
      break;
    default:
      throw new Error('Unknown error type: ' + data.type);
  }
}

function handleConnection(client) {
  console.log('Client connected');
  broadcast(wss.clients.size);
  client.send(JSON.stringify({ type: 'initial_connection' }));
  client.on('message', handleMessage)
  client.on('close', () => console.log('Client disconnected'));
}
wss.on('connection', handleConnection);

