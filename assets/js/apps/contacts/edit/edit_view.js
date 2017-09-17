ContactManager.module("ContactsApp.Edit", function(Edit,ContactManager, Backbone, Marionette, $, _){

Edit.editView = ContactManager.ContactsApp.Common.Views.Form.extend({
    initialize: function(){
    this.title = "Edit " + this.model.get("firstName");
    this.title += " " + this.model.get("lastName");
    },
    onRender: function(){
      if(this.options.generateTitle){
      var $title = $("<h1>", { text: this.title });
      this.$el.prepend($title);
      }
    }
  });

});
