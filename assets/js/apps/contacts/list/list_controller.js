ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
  List.Controller = {
    listContacts: function(){

      var loadingView = new ContactManager.Common.Views.Loading();
      ContactManager.mainRegion.show(loadingView);

      var fetchingContacts = ContactManager.request("contact:entities"),
      contactsListLayout = new List.Layout();
      contactsListPanel = new List.Panel();

      $.when(fetchingContacts).done(function(contacts){
          var contactsListView = new List.Contacts({
            collection: contacts
          });

          //Showing of list items
          contactsListLayout.on("show", function(){
            contactsListLayout.panelRegion.show(contactsListPanel);
            contactsListLayout.contactsRegion.show(contactsListView);
          });

          ContactManager.mainRegion.show(contactsListLayout);

          //List items events
          contactsListView.on('childview:contact:delete', function(childView,model){
            childView.model.destroy();
          })

          contactsListView.on('childview:contact:show', function(childView,model){
            ContactManager.ContactsApp.trigger('contact:show', childView.model.get('id'));
          })

          contactsListView.on('childview:contact:edit', function(childView,model){
            ContactManager.ContactsApp.trigger('contact:edit', childView.model.get('id'));
          });

          contactsListPanel.on("contact:new", function(){
            var newContact = new ContactManager.Entities.Contact();
            var view = new ContactManager.ContactsApp.New.Contact({
                          model: newContact
                        });
            ContactManager.dialogRegion.show(view);
            view.on("form:submit", function(data){
              var highestId = contacts.max(function(c){ return c.id; });
              highestId = highestId.get("id");
              data.id = highestId + 1;
                if(newContact.save(data)){
                  contacts.add(newContact);
                  view.trigger("dialog:close");
                }
            });
          });

      });
    }
  }
});
