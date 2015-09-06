define(["exports", "module"], function (exports, module) {
  "use strict";

  var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var Badge = (function () {
    function Badge() {
      _classCallCheck(this, Badge);

      this.text = "";
      this.timer = null;
      this.setTitle("点击图片保存为PDF！");
    }

    _prototypeProperties(Badge, null, {
      genText: {
        value: function genText() {
          switch (this.text) {
            case "":
              this.text = ".";
              break;
            case ".":
              this.text = "..";
              break;
            case "...":
              this.text = "";
              break;
          }
          return this.text;
        },
        writable: true,
        configurable: true
      },
      setColor: {
        value: function setColor(color) {
          chrome.browserAction.setBadgeBackgroundColor({
            color: color
          });
        },
        writable: true,
        configurable: true
      },
      setText: {
        value: function setText(text) {
          chrome.browserAction.setBadgeText({
            text: text
          });
        },
        writable: true,
        configurable: true
      },
      setTitle: {
        value: function setTitle(title) {
          chrome.browserAction.setTitle({
            title: title
          });
        },
        writable: true,
        configurable: true
      },
      done: {
        value: function done() {
          this.stop();
          this.setText("√");
          this.setTitle("转换完成！");
        },
        writable: true,
        configurable: true
      },
      fail: {
        value: function fail() {
          this.stop();
          this.setColor("#c00");
          this.setText("×");
          this.setTitle("不支持此页面");
        },
        writable: true,
        configurable: true
      },
      start: {
        value: function start() {
          var self = this;
          this.setColor("#0c0");
          this.setText("");
          this.setTitle("正在转换...");
          this.timer = setInterval(function () {
            self.setText(self.genText());
          }, 1000);
        },
        writable: true,
        configurable: true
      },
      stop: {
        value: function stop() {
          clearInterval(this.timer);
          this.setText("");
        },
        writable: true,
        configurable: true
      }
    });

    return Badge;
  })();

  var badge = undefined;
  module.exports = function () {
    if (typeof badge === "undefined") {
      badge = new Badge();
    }
    return badge;
  };
});