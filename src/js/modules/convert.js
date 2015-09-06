define(["exports", "module", "./openPage", "./Badge"], function (exports, module, _openPage, _Badge) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var openPage = _interopRequire(_openPage);

  var Badge = _interopRequire(_Badge);

  var badge = Badge();
  module.exports = function (url) {
    var $form = $("form");
    $form.find("[name=noCache]").val(Date.now());
    $form.find("[name=src]").val(url);
    badge.start();

    $.ajax({
      url: "http://pdfcrowd.com/form/json/convert/uri/",
      type: "POST",
      dataType: "json",
      data: $form.serialize()
    }).complete(function (res) {
      var json = res.responseJSON || {};
      if (json.status === "ok") {
        badge.done();
        var uri = "http://pdfcrowd.com" + json.uri;
        openPage(uri);
      } else {
        badge.fail();
      }
    });
  };
});