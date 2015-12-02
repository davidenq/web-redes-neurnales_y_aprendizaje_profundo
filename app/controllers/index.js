'use strict';

const content = require('../markdown-book');
const template = require('../resources/index.marko');

exports.index = function(request, reply) {
    template.render(content.index, reply);
};
exports.about = function(request, reply) {
    template.render(content.about, reply);
};
exports.exercises = function(request, reply) {
    template.render(content.exercises, reply);
};
exports.chapter1 = function(request, reply) {
    template.render(content.chapter1, reply);
};
