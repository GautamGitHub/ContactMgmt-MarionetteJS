ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _){

  Show.IncorrectContactView = Marionette.ItemView.extend({
    template: "#incorrect-contact-show"
  });

  Show.ContactView = Marionette.ItemView.extend({
    template: "#contact-item-view",
    events:{
      'click a.js-edit' : 'editClicked'
    },
    editClicked : function(e){
      e.preventDefault();
      this.trigger('contact:edit', this.model);
    }
  })
});
