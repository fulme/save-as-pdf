import openPage from './openPage';
import Badge from './Badge';

let badge = Badge();
export default function(url) {
  var $form = $('form');
  $form.find('[name=noCache]').val(Date.now());
  $form.find('[name=src]').val(url);
  badge.start();

  $.ajax({
    url: 'http://pdfcrowd.com/form/json/convert/uri/',
    type: 'POST',
    dataType: 'json',
    data: $form.serialize()
  }).complete(function(res) {
    var json = res.responseJSON || {};
    if (json.status === 'ok') {
      badge.done();
      var uri = 'http://pdfcrowd.com' + json.uri;
      openPage(uri);
    } else {
      badge.fail();
    }
  });
};
