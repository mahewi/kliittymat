Ext.application({
  name: 'Suoritukset',
  requires: [],
  views: ['Suoritukset.view.Main', 'Suoritukset.view.Kurssit'],
  models: ['Suoritukset.model.Opiskelija', 'Suoritukset.model.Kurssi', 'Suoritukset.model.Tutkinto', 'Suoritukset.model.Suoritus'],
  stores: ['Suoritukset.store.Opiskelijat','Suoritukset.store.Kurssit','Suoritukset.store.Tutkinnot', 'Suoritukset.store.Suoritukset'],
    
  launch: function(){
    Ext.Viewport.add({ xclass: 'Suoritukset.view.Main' });
  }
});


// Testausta varten
Ext.onReady(function() {
	abc_tatu_funktio();
});