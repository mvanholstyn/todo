Element.addMethods({
  observeExclusively: function(element, eventName, handler) {
    Event.observe(element, eventName, handler.wrap(function(proceed, event) {
      event.stop();
      return proceed();
    }));
  },

  request: function(element, options) {
    if(!element.match("[href]")) { return false; }

    var path = element.readAttribute('href');
    options = Object.extend({ method: "get" }, options);

    return new Ajax.Request(path, options);
  }
});

Object.extend(Function.prototype, {
  bindAsJSONResponse: function(object) {
    return this.bind(object).wrap(function(proceed, request) {
      var json = request.responseJSON;
      return proceed(json);
    }.bind(this))
  }
});

Element.fromHTML = function(html) {
  return new Element('div').update(html).down();
};
