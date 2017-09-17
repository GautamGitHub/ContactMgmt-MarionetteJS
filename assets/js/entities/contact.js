ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){
  Entities.Contact = Backbone.Model.extend({
    urlRoot : 'contacts',
    defaults: {
      firstName: "",
      lastName: "",
      phoneNumber: ""
    }
  });

  Entities.configureStorage("ContactManager.Entities.Contact");

  Entities.ContactCollection = Backbone.Collection.extend({
    url: 'contacts',
    model: Entities.Contact,
    comparator: "firstName"
  });

  Entities.configureStorage("ContactManager.Entities.ContactCollection");

  var contacts;

  var initializeContacts = function(){
    contacts = new Entities.ContactCollection([
      { id: 1, firstName: "Alice", lastName: "Arten", phoneNumber: "555-0184" },
      { id: 2, firstName: "Bob", lastName: "Brigham", phoneNumber: "555-0163" },
      { id: 3, firstName: "Charlie", lastName: "Campbell", phoneNumber: "555-0129" }
    ]);
    // contacts.save(); // I think this should be the way
    contacts.forEach(function(contact){
      contact.save();
    });

    return contacts.models;
  };

  var API = {
    getContactEntities: function(){
      var contacts = new Entities.ContactCollection();
      var deferred = $.Deferred();
      setTimeout(function(){
        contacts.fetch({  // backbone here will call GET on the url mentioned in ContactCollection definition
          success : function(data){
            deferred.resolve(data);
          },
          error : function(){
            deferred.reject();
          }
        })
      }, 2000)

      var promise = deferred.promise();
      $.when(promise).done(function(contacts){
        if(contacts.length === 0){ // when app is started, the storage is empty
          var models = initializeContacts();
          contacts.reset(models); // this addup onto storage
        }
      })

      return promise;
    },

    getContactEntity: function(id){
      var contact = new Entities.Contact({id: id});
      var deferred = $.Deferred();
      setTimeout(function(){
        contact.fetch({ // backbone here will call GET on the url mentioned in Contact appending id in the url
          success : function(data){
            deferred.resolve(data);
          },
          error : function(){
            deferred.reject();
          }
        });
      }, 2000);
      return deferred.promise();
    }
  };

  ContactManager.reqres.setHandler("contact:entities", function(){
    return API.getContactEntities();
  });

  ContactManager.reqres.setHandler("contact:entity", function(id){
    return API.getContactEntity(id);
  });
});
