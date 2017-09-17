ContactManager.module("ContactsApp", function(ContactsApp,ContactManager,Backbone, Marionette, $, _){
  ContactsApp.Router = Marionette.AppRouter.extend({
    appRoutes : {
      'contacts' : 'listContacts',
      'contacts/:id' : 'showContact',
      'contacts/edit/:id': 'editContact'
    }
  });

  var API = {
    listContacts : function (){
        ContactsApp.List.Controller.listContacts();
    },
    showContact : function(id){
      ContactsApp.Show.Controller.showContact(id);
    },
    editContact : function(id){
      ContactsApp.Edit.Controller.editContact(id);
    }
  };

  ContactManager.ContactsApp.on('contacts:list', function(){
    Backbone.history.navigate('contacts');
    API.listContacts();
  })

  ContactManager.ContactsApp.on('contact:show', function(id){
    Backbone.history.navigate('contact/'+ id);
    API.showContact(id);
  })

  ContactManager.ContactsApp.on('contact:edit', function(id){
    Backbone.history.navigate('contact/edit/'+ id);
    API.editContact(id);
  })

ContactManager.addInitializer(function(){
  new ContactsApp.Router({
    controller : API
  })
})

});
