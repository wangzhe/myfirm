(function() {
  var __slice = Array.prototype.slice;

  if (typeof tw === "undefined" || tw === null) tw = {};

  tw.batSignal = function() {
    var _batSignal;
    return _batSignal = function() {
      var _iframe;
      if (!_iframe) {
        _iframe = document.createElement('iframe');
        _iframe.setAttribute("id", "callback_iframe");
        _iframe.setAttribute("style", "display:none;");
        _iframe.setAttribute("height", "0px");
        _iframe.setAttribute("width", "0px");
        _iframe.setAttribute("frameborder", "0");
        document.documentElement.appendChild(_iframe);
      }
      return _iframe;
    };
  };

  tw.batSignalFor = function(event) {
    return function() {
      var argStr, args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      argStr = _.chain(args).filter(function(v) {
        return v != null;
      }).reduce((function(m, v) {
        return m + "&" + v;
      }), "").value();
      return window.batSignal().setAttribute('src', 'js-call:' + event + argStr);
    };
  };

}).call(this);
