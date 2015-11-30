'use strict';
const server = require('../server');
const Path = require('path');
const controllers = server.settings.app.modules.controllers.index;

server.route([
    {method: 'GET', path: '/', handler: controllers.index},
    {method: 'GET', path: '/about', handler: controllers.about},
    {method: 'GET', path: '/exercises_and_problems', handler: controllers.exercises},
    {method: 'GET', path: '/chapter-1', handler: controllers.chapter1}
]);

/* ===== */
server.route(
    {
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
    }
);

server.ext('onPreResponse', function(request, reply) {
    if (!request.response.isBoom) {
        return reply.continue();
    }
    reply.marko('errors/404', {
        'error': 'Ups! Algo salío mal.'
    });
});
