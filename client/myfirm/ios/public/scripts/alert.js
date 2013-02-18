(function() {

  calatrava.alert = function(message) {
    return calatrava.bridge.plugins.call('alert', 'displayAlert', {
      message: message
    });
  };

  calatrava.confirm = function(message, onOkExecute) {
    var okCallbackHandle;
    okCallbackHandle = calatrava.bridge.plugins.rememberCallback(onOkExecute);
    return calatrava.bridge.plugins.call('alert', 'displayConfirm', {
      message: message,
      okHandler: okCallbackHandle
    });
  };

}).call(this);
