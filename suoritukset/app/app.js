Ext.application({
  name: 'Suoritukset',
  requires: [],
  views: ['Suoritukset.view.Main', 'Suoritukset.view.Kurssit','Suoritukset.view.Tutkinnot','Suoritukset.view.Kurssi','Suoritukset.view.Tutkinto'],
  models: ['Suoritukset.model.Opiskelija', 'Suoritukset.model.Kurssi', 'Suoritukset.model.Tutkinto','Suoritukset.model.Suoritus'],
  stores: ['Suoritukset.store.Opiskelijat','Suoritukset.store.Kurssit','Suoritukset.store.Tutkinnot','Suoritukset.store.Suoritukset'],
    
  launch: function(){
    Ext.Viewport.add({ xclass: 'Suoritukset.view.Main' });
  }
});