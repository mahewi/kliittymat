Ext.define("Suoritukset.store.Opiskelijat", {
  extend: "Ext.data.Store",
  config: {
    storeId: 'opiskelijatstore',
    id: 'opiskelijatstore',
    model: 'Suoritukset.model.Opiskelija',
    autoLoad: true,
    grouper:{
        groupFn: function(record){
            return record.get('name')[0];
        }
    },
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
			var vuodet = {}
			for (var i = 0; i < store.getCount(); i++) {
				vuodet[store.getAt(i).get('started')] = true;
			}
			var options = [{text: '', value: ''}];
			for (var i in vuodet) {
				options.push({text: i,  value: i});
			}
			av.setOptions(options);
		}
  	}
  }
});