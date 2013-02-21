(function() {

  if (calatrava.shell == null) calatrava.shell = {};

  calatrava.shell.pageHelper = function($page) {
    var handlers;
    handlers = {};
    return {
      handler: function(name, callback) {
        return handlers[name] = callback;
      },
      trigger: function(name) {
        return handlers[name]();
      },
      reset: function() {
        return $("#overlay").remove();
      },
      initialize: function() {
        return $page.off('click', 'a[data-href]').on('click', 'a[data-href]', function() {
          return handlers['static_link']($(this).data('href'));
        });
      }
    };
  };

}).call(this);
