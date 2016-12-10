// Using Facebook's Dispatcher which is a singleton per application

var Dispatcher = require('flux').Dispatcher;

module.exports = new Dispatcher();
