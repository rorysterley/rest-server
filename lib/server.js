'use strict';

var http = require('http');
var routes = require('./router');

var server = module.exports = {};

server.start = function(port) {
  var portNum = port || 3000;

  http.createServer(function(req, res) {
    routes(req, res);
  }).listen(portNum);

  console.log('Server listening on port: ' + portNum + '\n');
};
