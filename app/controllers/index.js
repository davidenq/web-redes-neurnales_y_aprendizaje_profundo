'use strict';
const path = require('path');
const content = require('../markdown-book');

exports.index = function(request, reply) {
    reply.marko('index', content.index);
};
exports.about = function (request, reply){
    reply.marko('index', content.about);
};
exports.exercises = function (request, reply){
    reply.marko('index', content.exercises);
};
exports.chapter1 = function (request, reply){
    reply.marko('index', content.chapter1);
};
