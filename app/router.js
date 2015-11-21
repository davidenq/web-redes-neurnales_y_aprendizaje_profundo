'use strict';

const server = require('./server');
const controllers = server.settings.app.modules.controllers;

server.route([{
    method: 'GET',
    path: '/',
    handler: controllers.index.home
}]);
