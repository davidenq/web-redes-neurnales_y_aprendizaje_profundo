'use strict';

/* module dependences*/
const Hapi = require('hapi');
const Load = require('include-modules');
const Inert = require('inert');
var defaultOptions = require('marko/compiler').defaultOptions;
defaultOptions = {
    preserveWhitespace: {
        'pre': true,
        'textarea': true,
        'script': true
    },
    allowSelfClosing: {},
    startTagOnly: {
        'img': true,
        'br': true,
        'input': true,
        'meta': true,
        'link': true,
        'hr': true
    },
    checkUpToDate: true,
    writeToDisk: true
};


const paths = {
    'controllers': '/app/controllers',
    'config': '/app/config'
};

let modules = Load.modules(paths, __dirname);

const server = new Hapi.Server({
    app: {
        modules: modules
    }
});

server.connection({
    uri: process.env.OPENSHIFT_NODEJS_IP || modules.config.app.server.uri,
    port: process.env.OPENSHIFT_NODEJS_PORT || modules.config.app.server.port
});

const hapiMarko = require('hapi-marko');

console.log(hapiMarko);

server.register({
    register: hapiMarko,
    options: {
        
        hotReloading: {
            enabled: true
        },
        templatesDir: __dirname + modules.config.app.view.path
    }
}, () => {});

server.register(Inert, () => {});

server.start(function() {
    console.log('Running at: http://' + server.info.uri + ':' + server.info.port);
});

exports = module.exports = server;

require('./app/routes');
