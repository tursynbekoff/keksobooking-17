'use strict';
(function () {
  var onError = function (message) {
    var node = document.createElement('div');
    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var onSuccess = function (data) {
    window.userInfo = [];
    for (var i = 0; i < data.length; i++) {
      window.userInfo.push(
          {
            picture: data[i].author.avatar,
            apartmentType: data[i].offer.type,
            left: '' + data[i].location.x + 'px',
            top: '' + data[i].location.y + 'px'
          });
    }
  };

  window.load(onSuccess, onError);
})();
