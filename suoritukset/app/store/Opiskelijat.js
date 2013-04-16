Ext.define("Suoritukset.store.Opiskelijat", {
  extend: "Ext.data.Store",
  config: {
    storeId: 'opiskelijatstore',
    id: 'opiskelijatstore',
    model: 'Suoritukset.model.Opiskelija',
    autoLoad: true,
    proxy: {
      type: 'ajax',
      url: 'students.json',
      reader: {
        type: 'json'
      }
    },
	listeners: {
		load: function(store) {
			var av = Ext.getCmp('select');
			console.log(av.config.options);
			av.config.options = {};
			console.log(av.config.options);
			var vuodet = {}
			for (var i = 0; i < store.getCount(); i++) {
				vuodet[store.getAt(i).get('started')] = true;
			}
			console.log('moi');
			var options = [{text: '', value: ''}];
			for (var i in vuodet) {
				options.push({text: i,  value: i});
			}
			av.setOptions(options);
		}
    }
}});