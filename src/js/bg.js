define(["exports", "module", "./modules/convert", "./modules/urlMatch", "./modules/badge"], function (exports, module, _modulesConvert, _modulesUrlMatch, _modulesBadge) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var convert = _interopRequire(_modulesConvert);

  var urlMatch = _interopRequire(_modulesUrlMatch);

  var Badge = _interopRequire(_modulesBadge);

  var badge = Badge();
  var init = function () {
    chrome.browserAction.onClicked.addListener(function () {
      chrome.tabs.getSelected(function (tab) {
        if (urlMatch(tab.url)) {
          convert(tab.url);
        } else {
          badge.fail();
        }
      });
    });
  };

  module.exports = init;
});