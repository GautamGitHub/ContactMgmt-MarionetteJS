ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _){
  Show.Controller = {
    showContact: function(id){

      var loadingView = new ContactManager.Common.Views.Loading();
      ContactManager.mainRegion.show(loadingView);

      var fetchingContact = ContactManager.request("contact:entity", id),
      contactView;

      $.when(fetchingContact).done(function(contact){
        if(contact){
          contactView = new Show.ContactView({
            model: contact
          });
          contactView.on("contact:edit", function(contact){
            ContactManager.ContactsApp.trigger("contact:edit", contact.get("id"));
          });
        } else {
          contactView = new Show.IncorrectContactView({
            model: contact
          })
        }
        ContactManager.mainRegion.show(contactView);
      });
    }
  }
});
