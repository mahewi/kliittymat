Ext.define('Suoritukset.store.Kurssit', {
  extend: "Ext.data.Store",
  config: {
    storeId: 'kurssitstore',
    id: 'kurssitstore',
    model: 'Suoritukset.model.Kurssi',
    autoLoad: true,
    sorters: 'name',
    grouper:{
    	groupFn: function(record){
    		return record.get('name')[0];
    	}
    },
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