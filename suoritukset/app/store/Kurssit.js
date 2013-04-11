Ext.define('Suoritukset.store.Kurssit', {
	extend: "Ext.data.Store",
    
	config: {
	    storeId: 'kurssitstore',
        id: 'kurssitstore',
        model: 'Suoritukset.model.Kurssi',
		autoLoad: true,
		proxy: {
			type: 'ajax',
			url: 'courses.json',
			reader: {
				type: 'json',
				rootProperty: 'courses'
			}
		}
	}
});