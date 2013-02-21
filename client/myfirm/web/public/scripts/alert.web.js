(function() {

  if (calatrava.web == null) calatrava.web = {};

  calatrava.web.alert = function(method, _arg) {
    var message, okHandler, userPressedOk;
    message = _arg.message, okHandler = _arg.okHandler;
    if (!(message != null)) console.log("Unable to display alert.");
    if (method === 'displayAlert') {
      return window.alert(message);
    } else if (method === 'displayConfirm') {
      userPressedOk = window.confirm(message);
      return calatrava.bridge.runtime.invokePluginCallback(okHandler, userPressedOk);
    }
  };

  calatrava.bridge.runtime.registerPlugin('alert', calatrava.web.alert);

}).call(this);
