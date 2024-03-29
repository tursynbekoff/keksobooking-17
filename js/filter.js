'use strict';
(function () {
  var housingType = document.querySelector('#housing-type');

  var housingPrice = document.querySelector('#housing-price');

  var housingRooms = document.querySelector('#housing-rooms');

  var housingGuests = document.querySelector('#housing-guests');

  window.sort = function (object) {
    housingType = document.querySelector('#housing-type');
    var housingTypeValue = housingType.value;

    housingPrice = document.querySelector('#housing-price');
    var housingPriceValue = housingPrice.value;

    housingRooms = document.querySelector('#housing-rooms');
    var housingRoomsValue = housingRooms.value;

    housingGuests = document.querySelector('#housing-guests');
    var housingGuestsValue = housingGuests.value;

    var featureWifi = document.querySelector('#filter-wifi');
    var featureDishwasher = document.querySelector('#filter-dishwasher');
    var featureParking = document.querySelector('#filter-parking');
    var featureWasher = document.querySelector('#filter-washer');
    var featureElevator = document.querySelector('#filter-elevator');
    var featureConditioner = document.querySelector('#filter-conditioner');
    var MAX_PRICE = 50000;
    var MIN_PRICE = 10000;

    var filterByHousingType = function (input) {

      if (housingTypeValue !== 'any'
          && housingTypeValue !== input.offer.type) {
        return false;
      }

      if (housingPriceValue === 'high' &&
            input.offer.price < MAX_PRICE) {
        return false;
      } else if (housingPriceValue === 'middle' &&
            (input.offer.price < MIN_PRICE ||
            input.offer.price > MAX_PRICE)) {
        return false;
      } else if (housingPriceValue === 'low' &&
            input.offer.price > MIN_PRICE) {
        return false;
      }

      if (housingRoomsValue !== 'any' &&
          housingRoomsValue !== object.offer.rooms.toString()) {
        return false;
      }

      if (housingGuestsValue !== 'any' &&
          housingGuestsValue !== object.offer.guests.toString()) {
        return false;
      }

      if (featureWifi.checked) {
        if (!object.offer.features.includes(featureWifi.value)) {
          return false;
        }
      }

      if (featureDishwasher.checked) {
        if (!object.offer.features.includes(featureDishwasher.value)) {
          return false;
        }
      }

      if (featureParking.checked) {
        if (!object.offer.features.includes(featureParking.value)) {
          return false;
        }
      }

      if (featureWasher.checked) {
        if (!object.offer.features.includes(featureWasher.value)) {
          return false;
        }
      }

      if (featureElevator.checked) {
        if (!object.offer.features.includes(featureElevator.value)) {
          return false;
        }
      }

      if (featureConditioner.checked) {
        if (!object.offer.features.includes(featureConditioner.value)) {
          return false;
        }
      }

      return true;
    };

    var filteredByType = filterByHousingType(object);

    return filteredByType;
  };

  var filterForm = document.querySelector('.map__filters');
  var lastTimeout;
  filterForm.addEventListener('click', function () {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      window.updateMapPins();
      window.monitorCloseButton();
      window.monitorPopupDisplay();
    }, 500);
  });
})();
