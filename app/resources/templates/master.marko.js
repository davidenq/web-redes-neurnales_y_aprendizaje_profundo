function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      __loadTemplate = __helpers.l,
      ___partials_aside_marko = __loadTemplate(require.resolve("../partials/aside.marko"), require),
      __renderer = __helpers.r,
      _________node_modules_marko_node_modules_marko_layout_placeholder_tag_js = __renderer(require("marko/node_modules/marko-layout/placeholder-tag")),
      __tag = __helpers.t;

  return function render(data, out) {
    out.w('<!DOCTYPE html> <html lang="es"><head><meta charset="UTF-8"><title>Redes Neuronales y Aprendizaje Profundo</title><meta content="width=device-width, initial-scale=1.0" name="viewport"><meta content name="Libro gratuito acerca de las Redes Neuronales y Aprendizaje Profundo"><meta content name="David N\u00fa\u00f1ez"><link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.6.0/pure-min.css"><!--[if lte IE 8]>\n\t<link rel="stylesheet" href="css/layouts/side-menu-old-ie.css">\n\t<![endif]--><link href="public/assets/css/side-menu.css" rel="stylesheet"><link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet" type="text/css"><link href="public/assets/css/reset.css" rel="stylesheet" type="text/css"><link href="public/assets/css/style.css" rel="stylesheet" type="text/css"><link href="public/assets/css/social.css" rel="stylesheet" type="text/css"><style>body{ font-family: \'Source Sans Pro\', sans-serif; font-size: 10pt; color:#222;\n} /* Adapted from */ /*\nhttps://groups.google.com/d/msg/mathjax-users/jqQxrmeG48o/oAaivLgLN90J, */ /*\nby David Cervone */ @font-face { font-family: \'MJX_Math\'; src:\nurl(\'http://cdn.mathjax.org/mathjax/latest/fonts/HTML-CSS/TeX/eot/MathJax_Math-Italic.eot\');\n/* IE9 Compat Modes */ src:\nurl(\'http://cdn.mathjax.org/mathjax/latest/fonts/HTML-CSS/TeX/eot/MathJax_Math-Italic.eot?iefix\')\nformat(\'eot\'),\nurl(\'http://cdn.mathjax.org/mathjax/latest/fonts/HTML-CSS/TeX/woff/MathJax_Math-Italic.woff\')\nformat(\'woff\'),\nurl(\'http://cdn.mathjax.org/mathjax/latest/fonts/HTML-CSS/TeX/otf/MathJax_Math-Italic.otf\')\nformat(\'opentype\'),\nurl(\'http://cdn.mathjax.org/mathjax/latest/fonts/HTML-CSS/TeX/svg/MathJax_Math-Italic.svg#MathJax_Math-Italic\')\nformat(\'svg\'); } @font-face { font-family: \'MJX_Main\'; src:\nurl(\'http://cdn.mathjax.org/mathjax/latest/fonts/HTML-CSS/TeX/eot/MathJax_Main-Regular.eot\');\n/* IE9 Compat Modes */ src:\nurl(\'http://cdn.mathjax.org/mathjax/latest/fonts/HTML-CSS/TeX/eot/MathJax_Main-Regular.eot?iefix\')\nformat(\'eot\'),\nurl(\'http://cdn.mathjax.org/mathjax/latest/fonts/HTML-CSS/TeX/woff/MathJax_Main-Regular.woff\')\nformat(\'woff\'),\nurl(\'http://cdn.mathjax.org/mathjax/latest/fonts/HTML-CSS/TeX/otf/MathJax_Main-Regular.otf\')\nformat(\'opentype\'),\nurl(\'http://cdn.mathjax.org/mathjax/latest/fonts/HTML-CSS/TeX/svg/MathJax_Main-Regular.svg#MathJax_Main-Regular\')\nformat(\'svg\');\n}</style></head><body><div id="layout"><a href="#menu" id="menuLink" class="menu-link"><span></span></a><aside id="menu">');
    __helpers.i(out, ___partials_aside_marko, {});

    out.w('</aside><section>');
    __tag(out,
      _________node_modules_marko_node_modules_marko_layout_placeholder_tag_js,
      {
        "name": "content",
        "content": data.layoutContent
      });

    out.w('</section></div><script src="http://yui.yahooapis.com/3.17.2/build/yui/yui-min.js"></script><script src="/public/assets/js/ui.js"></script><script type="text/x-mathjax-config">\n        MathJax.Hub.Config({ tex2jax: {inlineMath: [[\'@\',\'@\']]}, "HTML-CSS": {scale: 92}, TeX: { equationNumbers: { autoNumber: "AMS" }}});\n    </script><script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);