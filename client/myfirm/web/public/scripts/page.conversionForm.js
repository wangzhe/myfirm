(function() {
  var __hasProp = Object.prototype.hasOwnProperty;

  if (calatrava.pageView == null) calatrava.pageView = {};

  calatrava.pageView.conversionForm = function() {
    var $p, $page, renderCurrencyDropdown, renderSection;
    $page = $('#conversionForm');
    $p = function(sel) {
      return $(sel, $page);
    };
    renderCurrencyDropdown = function($select, currencies) {
      return $select.empty().html(ich.currencyDropdownTmpl({
        currencies: currencies
      }));
    };
    renderSection = function(key, data) {
      switch (key) {
        case 'inCurrencies':
          return renderCurrencyDropdown($p('#in_currency'), data);
        case 'outCurrencies':
          return renderCurrencyDropdown($p('#out_currency'), data);
        default:
          return $p("#" + key).val(data);
      }
    };
    return {
      bind: function(event, handler) {
        console.log("event: " + event);
        switch (event) {
          case 'selectedInCurrency':
            return $p("#in_currency").off('change').on('change', handler);
          case 'selectedOutCurrency':
            return $p("#out_currency").off('change').on('change', handler);
          default:
            return $p("#" + event).off('click').on('click', handler);
        }
      },
      render: function(message) {
        var data, section, _results;
        console.log('rendering...', message);
        _results = [];
        for (section in message) {
          if (!__hasProp.call(message, section)) continue;
          data = message[section];
          _results.push(renderSection(section, data));
        }
        return _results;
      },
      get: function(field) {
        console.log('getting...', field);
        return $page.find("#" + field).val();
      },
      show: function() {
        return console.log('showing...');
      },
      hide: function() {
        return console.log('hiding...');
      }
    };
  };

}).call(this);
