define(["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = function (url) {
    var matches = ["http://*/*", "https://*/*", "ftp://*/*"];
    var r, i;
    for (i = matches.length - 1; i >= 0; i--) {
      r = new RegExp("^" + matches[i].replace(/\*/g, ".*") + "$");
      if (r.test(url)) {
        return true;
      }
    }
    return false;
  };
});