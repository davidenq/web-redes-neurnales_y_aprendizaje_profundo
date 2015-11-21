'use strict';

const internals = {};

internals.home = function(request, reply) {

    const template = require('../resources/templates/index.marko');

    template.render({
        name: 'Test'
    }, reply);
};

exports = module.exports = internals;
