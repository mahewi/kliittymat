Ext.application({
	name: 'Suoritukset',
	requires: [],
	views: ['Suoritukset.view.Main', 'Suoritukset.view.Kurssit'],
	models: ['Suoritukset.model.Opiskelija', 'Suoritukset.model.Kurssi', 'Suoritukset.model.Tutkinto'],
    stores: ['Suoritukset.store.Opiskelijat','Suoritukset.store.Kurssit','Suoritukset.store.Tutkinnot'],
	
	launch: function(){

	    Ext.Viewport.add({ xclass: 'Suoritukset.view.Main' });

	}
	
	
});