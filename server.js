'use strict';

/* module dependences*/
const Hapi = require('hapi');
const Load = require('include-modules');
const Inert = require('inert');
require('marko/node-require').install();
require('marko/compiler').defaultOptions.writeToDisk = false;

const paths = {
    'controllers': '/app/controllers',
    'config': '/app/config'
};

let modules = Load.modules(paths, __dirname);

const server = new Hapi.Server({
    app: {
        modules: modules,
        path: __dirname
    }
});

server.connection({
    uri: process.env.OPENSHIFT_NODEJS_IP || modules.config.app.server.uri,
    port: process.env.OPENSHIFT_NODEJS_PORT || modules.config.app.server.port
});

server.register(Inert, () => {});

server.start(function() {
    console.log('Running at: http://' + server.info.uri + ':' + server.info.port);
});

exports = module.exports = server;

require('./app/routes');
