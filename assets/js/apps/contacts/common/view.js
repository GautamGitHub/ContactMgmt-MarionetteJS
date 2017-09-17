ContactManager.module('ContactsApp.Common.Views', function(Views,ContactManager,Backbone, Marionette, $, _){
  Views.Form = Marionette.ItemView.extend({
    template : "#contact-form",
    events: {
      "click .js-submit" : "submitClicked"
    },
    submitClicked : function(e){
      e.preventDefault();
      console.log('submitClicked');
      var data = Backbone.Syphon.serialize(this);
      this.trigger("form:submit", data);
    }
  })
})
