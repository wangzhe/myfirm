(function() {
  var calatravaId;

  if (typeof calatrava === "undefined" || calatrava === null) calatrava = {};

  if (calatrava.bridge == null) calatrava.bridge = {};

  calatravaId = function() {
    var str;
    str = '';
    _.times(32, function() {
      var r;
      r = Math.floor(Math.random() * 16);
      return str = str + r.toString(16);
    });
    return str.toUpperCase();
  };

  calatrava.inbound = {
    dispatchEvent: function(proxyId) {
      var extraArgs, proxyPage;
      extraArgs = _.map(_.toArray(arguments).slice(1), (function(obj) {
        if (obj != null) return obj.valueOf();
      }));
      proxyPage = calatrava.bridge.pages.pageByProxyId(proxyId);
      return proxyPage.dispatch.apply(proxyPage, extraArgs);
    },
    fieldRead: function(proxyId, getId, fieldValue) {
      var proxyPage;
      proxyPage = calatrava.bridge.pages.pageByProxyId(proxyId);
      return proxyPage.fieldRead(getId, fieldValue);
    },
    successfulResponse: function(requestId, response) {
      return calatrava.bridge.requests.successfulResponse(requestId, response);
    },
    failureResponse: function(requestId, errorCode, response) {
      return calatrava.bridge.requests.failureResponse(requestId, errorCode, response);
    },
    fireTimer: function(timerId) {
      return calatrava.bridge.timers.fireTimer(timerId);
    },
    invokePluginCallback: function(handle, data) {
      return calatrava.bridge.plugins.invokeCallback(handle, data);
    }
  };

  calatrava.bridge.changePage = function(target) {
    calatrava.bridge.runtime.changePage(target);
    return target;
  };

  calatrava.bridge.alert = function(message) {
    calatrava.bridge.log("WARN: calatrava.bridge.alert is deprecated. Please use calatrava.alert() instead.");
    return calatrava.alert(message);
  };

  calatrava.bridge.openUrl = function(url) {
    return calatrava.bridge.runtime.openUrl(url);
  };

  calatrava.bridge.log = function(message) {
    return calatrava.bridge.runtime.log(message);
  };

  calatrava.bridge.request = function(options) {
    if (options.contentType != null) {
      options.customHeaders || (options.customHeaders = {});
      options.customHeaders['Content-Type'] = options.contentType;
    }
    return calatrava.bridge.requests.issue(options.url, options.method, options.body, options.success, options.failure, options.customHeaders);
  };

  calatrava.bridge.widgets = (function() {
    var callbacks;
    callbacks = {};
    return {
      display: function(name, options, callback) {
        return callbacks[name] = callback;
      },
      callback: function(name) {
        return callbacks[name];
      }
    };
  })();

  calatrava.bridge.pageObject = function(pageName) {
    var handlerRegistry, outstandingGets, proxyId;
    proxyId = calatravaId();
    handlerRegistry = {};
    outstandingGets = {};
    calatrava.bridge.runtime.registerProxyForPage(proxyId, pageName);
    return {
      bind: function(event, handler) {
        handlerRegistry[event] = handler;
        return calatrava.bridge.runtime.attachProxyEventHandler(proxyId, event);
      },
      bindAll: function(options) {
        var _this = this;
        return _.each(options, function(handler, event) {
          return pageObject.bind(event, handler);
        });
      },
      dispatch: function(event) {
        var args, _ref;
        args = _.toArray(arguments).slice(1);
        return (_ref = handlerRegistry[event]) != null ? _ref.apply(this, args) : void 0;
      },
      get: function(field, callback) {
        var getId;
        getId = calatravaId();
        outstandingGets[getId] = callback;
        return calatrava.bridge.runtime.valueOfProxyField(proxyId, field, getId);
      },
      fieldRead: function(getId, fieldValue) {
        outstandingGets[getId](fieldValue);
        return delete outstandingGets[getId];
      },
      getMany: function(fields, callback) {
        var getManyPrime, results,
          _this = this;
        results = {};
        getManyPrime = function(remaining) {
          var field;
          if (remaining.length > 0) {
            field = _.first(remaining);
            return _this.get(field, function(fieldValue) {
              results[field] = fieldValue;
              return getManyPrime(_.rest(remaining));
            });
          } else {
            return callback(results);
          }
        };
        return getManyPrime(fields);
      },
      render: function(viewObject) {
        return calatrava.bridge.runtime.renderProxy(viewObject, proxyId);
      },
      proxyId: proxyId
    };
  };

  calatrava.bridge.pages = (function() {
    var pagesByName, pagesByProxyId;
    pagesByName = {};
    pagesByProxyId = {};
    return {
      pageNamed: function(pageName) {
        var page;
        if (!(pagesByName[pageName] != null)) {
          page = calatrava.bridge.pageObject(pageName);
          pagesByName[pageName] = page;
          pagesByProxyId[page.proxyId] = page;
        }
        return pagesByName[pageName];
      },
      pageByProxyId: function(proxyId) {
        return pagesByProxyId[proxyId];
      }
    };
  })();

  calatrava.bridge.requests = (function() {
    var clearHandlers, failureHandlersById, successHandlersById;
    successHandlersById = {};
    failureHandlersById = {};
    clearHandlers = function(requestId) {
      delete successHandlersById[requestId];
      return delete failureHandlersById[requestId];
    };
    return {
      issue: function(url, method, body, success, failure, customHeaders) {
        var bodyStr, requestId;
        requestId = calatravaId();
        bodyStr = body;
        if ((bodyStr != null) && bodyStr.constructor !== String) {
          bodyStr = JSON.stringify(body);
        }
        successHandlersById[requestId] = success;
        failureHandlersById[requestId] = failure;
        return calatrava.bridge.runtime.issueRequest({
          requestId: requestId,
          url: url,
          method: method,
          body: bodyStr,
          headers: customHeaders,
          success: success,
          failure: failure
        });
      },
      successfulResponse: function(requestId, response) {
        successHandlersById[requestId](response);
        return clearHandlers(requestId);
      },
      failureResponse: function(requestId, response) {
        failureHandlersById[requestId](response);
        return clearHandlers(requestId);
      }
    };
  })();

  calatrava.bridge.timers = (function() {
    var callbacks;
    callbacks = {};
    return {
      start: function(timeout, callback) {
        var timerId;
        timerId = calatravaId();
        callbacks[timerId] = callback;
        calatrava.bridge.runtime.startTimerWithTimeout(timerId, timeout);
        return timerId;
      },
      fireTimer: function(timerId) {
        if (callbacks[timerId]) return callbacks[timerId]();
      },
      clearTimer: function(timerId) {
        return delete callbacks[timerId];
      }
    };
  })();

  calatrava.bridge.plugins = (function() {
    var callbacks, registered;
    registered = {};
    callbacks = {};
    return {
      call: function(pluginName, method, argMessage) {
        return calatrava.bridge.runtime.callPlugin(pluginName, method, argMessage);
      },
      register: function(pluginName, callback) {
        return registered[pluginName] = callback;
      },
      run: function(pluginName, method, argMessage) {
        return registered[pluginName](method, argMessage);
      },
      rememberCallback: function(callback) {
        return _.tap(calatravaId(), function(handle) {
          return callbacks[handle] = callback;
        });
      },
      invokeCallback: function(handle, data) {
        callbacks[handle](data);
        return delete callbacks[handle];
      }
    };
  })();

  calatrava.bridge.plugin = function(name, impl) {
    return calatrava.bridge.plugins.register(name, impl);
  };

}).call(this);
