function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      __loadTemplate = __helpers.l,
      ___templates_master_marko = __loadTemplate(require.resolve("../templates/master.marko"), require),
      __renderer = __helpers.r,
      _________node_modules_marko_node_modules_marko_layout_use_tag_js = __renderer(require("marko/node_modules/marko-layout/use-tag")),
      __tag = __helpers.t,
      _________node_modules_marko_node_modules_marko_layout_put_tag_js = __renderer(require("marko/node_modules/marko-layout/put-tag")),
      escapeXml = __helpers.x;

  return function render(data, out) {
    __tag(out,
      _________node_modules_marko_node_modules_marko_layout_use_tag_js,
      {
        "template": ___templates_master_marko,
        "getContent": function(__layoutHelper) {
          __tag(out,
            _________node_modules_marko_node_modules_marko_layout_put_tag_js,
            {
              "into": "content",
              "layout": __layoutHelper
            },
            function(out) {
              out.w('<div id="main"><div class="book-content"><div class="header"><div class="pure-u-1-2"><h2 class="book-content-title">404, Error</h2><p class="book-content-subtitle"></p></div><div class="book-content-controls pure-u-1-2"><button class="pure-button pure-button-primary">Volver</button></div></div><div class="content"><article class="font-article"><h3>' +
                escapeXml(data.error) +
                '</h3><em>El recurso al que deseas acceder: no est\u00e1 disponible, o quiz\u00e1s se elimin\u00f3 el\ncontenido, o posiblemente se traslado a otra\ndirecci\u00f3n</em></article></div></div></div>');
            });
        },
        "*": {
          "showHeader": true
        }
      });
  };
}
(module.exports = require("marko").c(__filename)).c(create);