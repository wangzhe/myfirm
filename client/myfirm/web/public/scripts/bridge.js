(function() {
  var _ref, _ref2;

  if (typeof calatrava === "undefined" || calatrava === null) calatrava = {};

  calatrava.bridge = (_ref = calatrava.bridge) != null ? _ref : {};

  calatrava.bridge.web = (_ref2 = calatrava.bridge.web) != null ? _ref2 : {};

  calatrava.bridge.environment = function() {
    return {
      sessionTimeout: 600,
      serviceEndpoint: "",
      apiEndpoint: ""
    };
  };

  calatrava.bridge.web.ajax = function(options) {
    var errorHandler, goToTop, hideLoader, loader, setCustomHeaders, showLoader;
    loader = $("#loader");
    errorHandler = function() {
      loader.find('.load').hide();
      loader.find('.error').show();
      loader.find('.error a').bind('click', hideLoader);
      return loader.show();
    };
    setCustomHeaders = function(xhr, headers) {
      return _.map(headers, function(value, key) {
        return xhr.setRequestHeader(key, value);
      });
    };
    showLoader = function() {
      loader.css({
        height: $(document.offset).height,
        width: $(document.offset).width,
        top: document.body.scrollTop
      });
      loader.find('.box').css({
        top: ($(document.offset).height / 2) - (loader.height() / 2) - 50
      });
      loader.find('.error').hide();
      loader.find('.load').show();
      $(document.body).css({
        overflow: 'hidden'
      });
      return loader.show();
    };
    hideLoader = function() {
      $(document.body).css({
        overflow: 'auto'
      });
      return loader.hide();
    };
    goToTop = function() {
      return document.body.scrollTop = 0;
    };
    return $.ajax({
      url: options.url,
      type: options.method,
      data: options.body,
      contentType: (function() {
        var contentTypeHeader, customHeaderTemp, key;
        customHeaderTemp = {};
        for (key in options.customHeaders) {
          if (key === "Content-Type") {
            contentTypeHeader = options.customHeaders[key];
          } else {
            customHeaderTemp[key] = options.customHeaders[key];
          }
        }
        options.customHeaders = customHeaderTemp;
        return contentTypeHeader;
      })(),
      beforeSend: function(xhr) {
        if (options.customHeaders) setCustomHeaders(xhr, options.customHeaders);
        return showLoader();
      },
      success: function(response) {
        goToTop();
        return options.success(response);
      },
      error: function() {
        showLoader();
        return options.failure();
      },
      complete: hideLoader
    });
  };

  calatrava.bridge.web.page = function(pageName, proxyId) {
    var handlers, methods, real;
    real = calatrava.pageView[pageName]();
    handlers = {};
    methods = {
      bind: function(event, callback) {
        if (event === 'pageOpened') {
          return handlers.pageOpened = callback;
        } else {
          return real.bind(event, callback);
        }
      },
      trigger: function(event) {
        if (handlers[event] != null) return handlers[event]();
      },
      get: function(field, getId) {
        return calatrava.inbound.fieldRead(proxyId, getId, String(real.get(field)));
      }
    };
    _.each(['render', 'show', 'hide'], function(method) {
      return methods[method] = function() {
        return real[method].apply(real, arguments);
      };
    });
    return methods;
  };

  calatrava.bridge.runtime = (function() {
    var currentPage, pages, pagesNamed, plugins;
    pages = {};
    pagesNamed = {};
    currentPage = null;
    plugins = {};
    return {
      registerProxyForPage: function(proxyId, pageName) {
        pages[proxyId] = calatrava.bridge.web.page(pageName, proxyId);
        return pagesNamed[pageName] = pages[proxyId];
      },
      changePage: function(page, options) {
        var pageObject;
        if (options == null) options = {};
        pageObject = pagesNamed[page];
        if (!options.back) {
          history.pushState({
            page: page
          }, "", "");
        }
        if (currentPage) currentPage.hide();
        pageObject.show();
        currentPage = pageObject;
        return pageObject.trigger('pageOpened');
      },
      attachProxyEventHandler: function(proxyId, event) {
        return pages[proxyId].bind(event, function() {
          var args;
          args = [proxyId, event].concat(_.toArray(arguments));
          return calatrava.inbound.dispatchEvent.apply(calatrava.inbound, args);
        });
      },
      valueOfProxyField: function(proxyId, field, getId) {
        return pages[proxyId].get(field, getId);
      },
      renderProxy: function(viewObject, proxyId) {
        return pages[proxyId].render(viewObject);
      },
      issueRequest: calatrava.bridge.web.ajax,
      openUrl: function(url) {
        return window.open(url);
      },
      log: function(message) {
        return console.log(message);
      },
      startTimerWithTimeout: function(timerId, timeout) {
        return window.setTimeout((function() {
          return calatrava.inbound.fireTimer(timerId);
        }), timeout * 1000);
      },
      registerPlugin: function(pluginName, callback) {
        return plugins[pluginName] = callback;
      },
      callPlugin: function(plugin, method, args) {
        return plugins[plugin](method, args);
      },
      invokePluginCallback: function(handle, data) {
        return calatrava.inbound.invokePluginCallback(handle, data);
      }
    };
  })();

}).call(this);
