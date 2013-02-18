(function() {

  if (typeof example === "undefined" || example === null) example = {};

  if (example.converter == null) example.converter = {};

  example.converter.start = function() {
    example.converter.controller({
      views: {
        conversionForm: calatrava.bridge.pages.pageNamed("conversionForm")
      },
      changePage: calatrava.bridge.changePage,
      ajax: calatrava.bridge.request
    });
    return calatrava.bridge.changePage("conversionForm");
  };

}).call(this);
