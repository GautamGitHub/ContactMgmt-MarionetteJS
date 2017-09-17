ContactManager.module("ContactsApp.Edit", function(Edit, ContactManager, Backbone, Marionette, $, _){
  Edit.Controller = {
    editContact: function(id){

      // var loadingView = new ContactManager.Common.Views.Loading();
      // ContactManager.mainRegion.show(loadingView);

      var fetchingContact = ContactManager.request("contact:entity", id),
      editView;

      $.when(fetchingContact).done(function(contact){
        if(contact){
          editView = new Edit.editView({
            model: contact,
            generateTitle : true
          });

          ContactManager.dialogRegion.show(editView);

          editView.on("form:submit", function(data){
          contact.save(data);
          editView.trigger("dialog:close");
          ContactManager.ContactsApp.trigger("contacts:list", contact.get("id"));
          });
        } else {
          editView = new Show.IncorrectContactView({
            model: contact
          })
        }
        // ContactManager.mainRegion.show(editView);
      });
    }
  }
});
