function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x;

  return function render(data, out) {
    out.w('<!DOCTYPE html> <html lang="es"><head><meta charset="UTF-8"><title>Index</title></head><body><h1>P\u00e1gina principal</h1>' +
      escapeXml(data.name) +
      '</body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);