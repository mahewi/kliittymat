Ext.application({
  name: 'Suoritukset',
  requires: [],
  views: ['Suoritukset.view.Main', 'Suoritukset.view.Kurssit', 'Suoritukset.view.Kurssi'],
  models: ['Suoritukset.model.Opiskelija', 'Suoritukset.model.Kurssi', 'Suoritukset.model.Tutkinto'],
  stores: ['Suoritukset.store.Opiskelijat','Suoritukset.store.Kurssit','Suoritukset.store.Tutkinnot'],
    
  launch: function(){
    Ext.Viewport.add({ xclass: 'Suoritukset.view.Main' });
  }
});

// TESTAUKSEEN
/*
Ext.onReady(function() {
  var button = Ext.get("ext-button-3")
  button.fireEvent("tap");
});
*/