'use strict';

const content = require('../book');
const index = require('../resources/index.marko');
const chapter1 = require('../resources/chapter1.marko');

exports.index = function(request, reply) {
    index.render(content.index, reply);
};
exports.introduction = function(request, reply) {
    index.render(content.introduction, reply);
};
exports.about = function(request, reply) {
    index.render(content.about, reply);
};
exports.exercises = function(request, reply) {
    index.render(content.exercises, reply);
};
exports.chapter1 = function(request, reply) {
    chapter1.render(content.chapter1, reply);
};
