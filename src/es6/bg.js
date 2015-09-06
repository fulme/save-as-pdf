import convert from "./modules/convert";
import urlMatch from "./modules/urlMatch";
import Badge from "./modules/badge";

let badge = Badge();
let init = function() {
  chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.getSelected(function(tab) {
      if (urlMatch(tab.url)) {
        convert(tab.url);
      } else {
        badge.fail();
      }
    });
  });
}

export default init;
