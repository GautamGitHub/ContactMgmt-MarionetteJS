ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){

  List.Layout = Marionette.LayoutView.extend({
    template : "#contact-list-layout",

    regions :{
      panelRegion : "#panel-region",
      contactsRegion : "#contacts-region"
    }
  });

  List.Panel = Marionette.ItemView.extend({
    template : "#contact-list-panel",

    triggers : {
      'click button.js-new' : 'contact:new'
    }
  })

  List.Contact = Marionette.ItemView.extend({
    tagName: "tr",
    template: "#contact-list-item",
    events: {
      "click" : "highlightTableRow"
    },
    triggers : {
      "click button.js-delete": "contact:delete",
      "click .js-show": "contact:show",
      "click .js-edit": "contact:edit"
    },
    highlightTableRow : function(){
      this.$el.toggleClass("warning");
    }
  });

  List.Contacts = Marionette.CollectionView.extend({
    tagName: "table",
    className : "table table-hover",
    childView: List.Contact
  });

});
