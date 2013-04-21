Ext.define('Suoritukset.store.Kandikurssit', {
	extend: "Ext.data.Store",
		config: {
		storeId: 'kandikurssitstore',
		id: 'kandikurssitstore',
		model: 'Suoritukset.model.Kandikurssi',
		autoLoad: true,
		proxy: {
			type: 'ajax',
			url: 'kandikurssit.json',
			reader: {
				type: 'json'
			}
		}
	}
});
