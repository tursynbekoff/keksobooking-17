'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapWidth = map.clientWidth;
  var mapInitialPin = document.querySelector('.map__pin--main');
  var uploadPhotoField = document.querySelector('.ad-form-header');
  uploadPhotoField.disabled = true;

  var inputUserInfoFields = document.querySelectorAll('.ad-form__element');

  window.disableInput = function (input) {
    for (var i = 0; i < input.length; i++) {
      input[i].disabled = true;
    }
  };

  window.activateInput = function (input) {
    for (var i = 0; i < input.length; i++) {
      input[i].disabled = false;
    }
  };

  window.disableInput(inputUserInfoFields);

  var address = document.querySelector('#address');
  var pinCoordinate = function (x, y) {
    address.defaultValue = x + ',' + y;
  };

  mapInitialPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if ((((mapInitialPin.offsetLeft - shift.x) <= (mapWidth - 60)) && ((mapInitialPin.offsetLeft - shift.x) >= 0)) &&
      ((mapInitialPin.offsetTop - shift.y) >= 130 && (mapInitialPin.offsetTop - shift.y) <= 630)) {
        mapInitialPin.style.top = (mapInitialPin.offsetTop - shift.y) + 'px';
        mapInitialPin.style.left = (mapInitialPin.offsetLeft - shift.x) + 'px';
        pinCoordinate((mapInitialPin.offsetLeft - shift.x), (mapInitialPin.offsetTop - shift.y));
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      uploadPhotoField.disabled = false;

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      address.focus();

      var form = document.querySelector('.ad-form');
      window.activateInput(inputUserInfoFields);
      form.classList.remove('ad-form--disabled');
      map.classList.remove('map--faded');

      window.updateMapPins();
      window.monitorCloseButton();
      window.monitorPopupDisplay();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
