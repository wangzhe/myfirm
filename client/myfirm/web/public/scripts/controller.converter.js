(function() {

  if (typeof example === "undefined" || example === null) example = {};

  if (example.converter == null) example.converter = {};

  example.converter.controller = function(_arg) {
    var ajax, changePage, convert, currencies, currencyDropdownViewMessage, currencyRate, inCurrency, outCurrency, performConversion, views;
    views = _arg.views, changePage = _arg.changePage, ajax = _arg.ajax;
    currencies = ['USD', 'AUD', 'GBP', 'INR'];
    currencyRate = {
      USD: 1,
      AUD: 0.96,
      GBP: 0.62,
      INR: 55
    };
    inCurrency = "USD";
    outCurrency = "AUD";
    currencyDropdownViewMessage = function(selectedCurrency, unselectableCurrency) {
      return _.map(currencies, function(c) {
        return {
          code: c,
          enabled: c !== unselectableCurrency,
          selected: c === selectedCurrency
        };
      });
    };
    performConversion = function(amount) {
      var inRate, outRate;
      outRate = currencyRate[outCurrency];
      inRate = currencyRate[inCurrency];
      return views.conversionForm.render({
        out_amount: (Math.round(amount * (outRate / inRate) * 100)) / 100
      });
    };
    convert = function() {
      return views.conversionForm.get('in_amount', function(inAmount) {
        if (inAmount === "") {
          return calatrava.confirm("No amount to convert. Convert one instead?", function(convertOne) {
            if (convertOne) return performConversion(1);
          });
        } else {
          return performConversion(inAmount);
        }
      });
    };
    views.conversionForm.bind('convert', convert);
    views.conversionForm.bind('selectedInCurrency', function() {
      return views.conversionForm.get('in_currency', function(in_currency) {
        inCurrency = in_currency;
        return views.conversionForm.render({
          outCurrencies: currencyDropdownViewMessage(outCurrency, inCurrency)
        });
      });
    });
    views.conversionForm.bind('selectedOutCurrency', function() {
      return views.conversionForm.get('out_currency', function(out_currency) {
        outCurrency = out_currency;
        return views.conversionForm.render({
          inCurrencies: currencyDropdownViewMessage(inCurrency, outCurrency)
        });
      });
    });
    return views.conversionForm.render({
      inCurrencies: currencyDropdownViewMessage(inCurrency, outCurrency),
      outCurrencies: currencyDropdownViewMessage(outCurrency, inCurrency),
      in_amount: 1
    });
  };

}).call(this);
