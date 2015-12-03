'use strict';

const Fs = require('fs');
const Path = require('path');

exports.index = {
    title: 'Información',
    contents: render('../../README.md'),
    previewURL: '/',
    nextURL: '/index'
};
exports.introduction = {
    title: 'Redes Neuronales y Aprendizaje Profundo',
    contents: render('es/index.md'),
    previewURL: '/',
    nextURL: '/about'
};
exports.about = {
    title: 'Acerca de este libro',
    contents: render('es/about.md'),
    previewURL: '/',
    nextURL: '/exercises_and_problems'
};
exports.exercises = {
    title: 'Sobre los ejercicios y problemas',
    contents: render('es/exercises_and_problems.md'),
    previewURL: '/about',
    nextURL: '/chapter1'
};
exports.chapter1 = {
    title: 'Capítulo 1',
    subtitle: 'Usando redes neuronales para reconocimiento de dígitos manuscritos',
    contents: {
        part1:render('es/chapter1/part1.md'),
        part2:render('es/chapter1/part2.md'),
        part3:render('es/chapter1/part3.md')
    },
    previewURL: '/about',
    nextURL: '/chapter2'
};

function render(pathMD) {
    const optionsAscii = {
        decimalMark: '.', // -m,  --decimalmark='.'
        colSep: ',', // -c,  --colsep=','
        rowSep: ';', // -r,  --rowsep=';'
        dir: 'ltr', //      --rtl
        bare: false, // -b,  --bare
        standalone: false, // -s,  --standalone
        annotate: true // -a,  --annotate
    };
    const options = {
        inlineOpen: '@',
        inlineClose: '@',
        blockOpen: '%',
        blockClose: '%',
        inlineRenderer: require('ascii2mathml')(optionsAscii),
        blockRenderer: require('ascii2mathml')(Object.assign({
            display: 'block'
        }, optionsAscii))
    };
    const content = Fs.readFileSync(Path.join(__dirname, pathMD), 'utf8');
    const md = require('markdown-it')({
        html: true,
        linkify: true,
        typographer: true
    }).use(require('markdown-it-math'), options);
    const result = md.render(content);
    return result;
}
