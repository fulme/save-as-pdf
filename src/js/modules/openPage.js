define(["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = function (url) {
    var newTab = null;

    chrome.tabs.query({}, function (tabs) {
      var i;
      for (i = 0; i < tabs.length; i++) {
        var tab = tabs[i];

        if (tab.url === url) {
          chrome.tabs.update(tab.id, {
            url: url,
            selected: true
          });
          //noinspection JSLint
          return;
        } else if (tab.url === "chrome://newtab/") {
          newTab = tab;
        }
      }

      if (newTab) {
        chrome.tabs.update(newTab.id, {
          url: url,
          selected: true
        });
      } else {
        chrome.windows.getCurrent(function (win) {
          var winId = win.id;
          chrome.tabs.create({
            windowId: winId,
            url: url
          });
        });
      }
    });
  };
});