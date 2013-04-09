Ext.application({
	name: 'Suoritukset',
	requires: [],
	views: ['Suoritukset.view.Main', 'Suoritukset.view.opView'],
	
	launch: function(){

	    Ext.Viewport.add({ xclass: 'Suoritukset.view.Main' });

	}
	
	
});