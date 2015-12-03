'use strict';
const server = require('../server');
const Path = require('path');
const controllers = server.settings.app.modules.controllers.index;
const template = require('./resources/errors/404.marko');

server.route([{
    method: 'GET',
    path: '/',
    handler: controllers.index
}, {
    method: 'GET',
    path: '/introduction',
    handler: controllers.introduction
},{
    method: 'GET',
    path: '/about',
    handler: controllers.about
}, {
    method: 'GET',
    path: '/exercises_and_problems',
    handler: controllers.exercises
}, {
    method: 'GET',
    path: '/chapter-1',
    handler: controllers.chapter1
}]);

/* ===== */
server.route({
    method: 'GET',
    path: '/public/{path*}',
    config: {
        handler: {
            directory: {
                path: Path.join(__dirname, '..', 'public'),
                index: false,
                redirectToSlash: false
            }
        }
    }
});

server.ext('onPreResponse', function(request, reply) {
    if (!request.response.isBoom) {
        return reply.continue();
    }
    template.render({
        'error': '¡Ups! Recurso no encontrado'
    }, reply);
});
