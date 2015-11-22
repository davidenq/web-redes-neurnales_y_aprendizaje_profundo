'use strict';

const internals = {};

internals.home = function(request, reply) {
    reply.marko('index', {
        name: 'Test'
    });
};

exports = module.exports = internals;
