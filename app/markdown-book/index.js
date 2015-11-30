'use strict';

const Fs = require('fs');
const Path = require('path');

exports.index = {
    title: 'Prefacio',
    contents: Fs.readFileSync(Path.join(__dirname, 'es/index.md'), 'utf8'),
    previewURL:'/',
    nextURL: '/about'
};
exports.about = {
    title: 'Acerca de este libro',
    contents: Fs.readFileSync(Path.join(__dirname, 'es/about.md'), 'utf8'),
    previewURL:'/',
    nextURL:'/exercises_and_problems'
};
exports.exercises = {
    title: 'Sobre los ejercicios y problemas',
    contents: Fs.readFileSync(Path.join(__dirname, 'es/exercises_and_problems.md'), 'utf8'),
    previewURL: '/about',
    nextURL: '/chapter1'
};
exports.chapter1 = {
    title: 'Capítulo 1',
    contents: Fs.readFileSync(Path.join(__dirname, 'es/chapter_1.md'), 'utf8'),
    previewURL: '/about',
    nextURL: '/chapter2'
};
