Ext.application({
	name: 'Ohjelmointityö',
	requires: [],
	views: ['Ohjelmointityö.view.Main','Ohjelmointityö.view.opView'],
	
	launch: function(){
		 
		Ext.Viewport.add({xclass:'Ohjelmointityö.view.Main'});

	}
	
	
});