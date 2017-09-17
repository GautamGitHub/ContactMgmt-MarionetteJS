var ContactManager = new Marionette.Application();

ContactManager.addRegions({
  mainRegion: "#main-region",
  dialogRegion: Marionette.Region.Dialog.extend({
    el: '#dialog-region'
  })
});

ContactManager.navigate = function(routes,options){
  options = options || {};
  Backbone.history.navigate(routes,options);

},

ContactManager.getCurrentRoute = function (){
  return Backbone.history.fragment;
}

ContactManager.on("start", function(){
  if(Backbone.history){
    Backbone.history.start();
  }

  if(this.getCurrentRoute() == ''){
    ContactManager.ContactsApp.trigger('contacts:list');
  }

});
