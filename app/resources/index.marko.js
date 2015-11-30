function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      __loadTemplate = __helpers.l,
      __templates_master_marko = __loadTemplate(require.resolve("./templates/master.marko"), require),
      __renderer = __helpers.r,
      ______node_modules_marko_node_modules_marko_layout_use_tag_js = __renderer(require("marko/node_modules/marko-layout/use-tag")),
      __tag = __helpers.t,
      ______node_modules_marko_node_modules_marko_layout_put_tag_js = __renderer(require("marko/node_modules/marko-layout/put-tag")),
      escapeXml = __helpers.x,
      attr = __helpers.a;

  return function render(data, out) {
    __tag(out,
      ______node_modules_marko_node_modules_marko_layout_use_tag_js,
      {
        "template": __templates_master_marko,
        "getContent": function(__layoutHelper) {
          __tag(out,
            ______node_modules_marko_node_modules_marko_layout_put_tag_js,
            {
              "into": "content",
              "layout": __layoutHelper
            },
            function(out) {
              out.w('<div id="main"><div class="book-content"><div class="header"><div class="pure-u-1-2"><h1 class="book-content-title">' +
                escapeXml(data.title) +
                '</h1></div><div class="book-content-controls pure-u-1-2"><a' +
                attr("href", data.nextURL) +
                '>Siguiente</a></div></div><div class="content"><article class="font-article"><div id="contentMDtoHTML">' +
                escapeXml(data.contents) +
                '</div></article></div></div></div><script src="/public/assets/js/markdownit.js"></script><script type="text/javascript">\n            var content = document.getElementById(\'contentMDtoHTML\').innerHTML;\n            var md = new markdownit({\n                html: true,\n                breaks:true\n            });\n            var result = md.render(content);\n            document.getElementById(\'contentMDtoHTML\').innerHTML = result;\n        </script>');
            });
        },
        "*": {
          "showHeader": true
        }
      });
  };
}
(module.exports = require("marko").c(__filename)).c(create);