ContactManager.module("ContactsApp.New", function(New,ContactManager, Backbone, Marionette, $, _){

  New.Contact = ContactManager.ContactsApp.Common.Views.Form.extend({
    initialize: function(){
    this.title = 'New Contact';
    }
  });

});
