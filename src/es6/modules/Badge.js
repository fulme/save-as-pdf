class Badge {
  constructor() {
    this.text = '';
    this.timer = null;
    this.setTitle('点击图片保存为PDF！');
  }

  genText() {
    switch (this.text) {
      case '':
        this.text = '.';
        break;
      case '.':
        this.text = '..';
        break;
      case '...':
        this.text = '';
        break;
    }
    return this.text;
  }

  setColor(color) {
    chrome.browserAction.setBadgeBackgroundColor({
      color: color
    });
  }

  setText(text) {
    chrome.browserAction.setBadgeText({
      text: text
    });
  }

  setTitle(title) {
    chrome.browserAction.setTitle({
      title: title
    });
  }

  done() {
    this.stop();
    this.setText('√');
    this.setTitle('转换完成！');
  }

  fail() {
    this.stop();
    this.setColor('#c00');
    this.setText('×');
    this.setTitle('不支持此页面');
  }

  start() {
    var self = this;
    this.setColor('#0c0');
    this.setText('');
    this.setTitle('正在转换...');
    this.timer = setInterval(function() {
      self.setText(self.genText())
    }, 1000);
  }

  stop() {
    clearInterval(this.timer);
    this.setText('');
  }
}

let badge;
export default function() {
  if (typeof badge === 'undefined') {
    badge = new Badge;
  }
  return badge;
};
