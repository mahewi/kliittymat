Ext.define("Suoritukset.store.Tutkinnot", {
  extend: "Ext.data.Store",
  config: {
    model: 'Suoritukset.model.Tutkinto',
    autoLoad: true,
    storeId: 'tutkinnotstore',
    id: 'tutkinnotstore',
    proxy: {
      type: 'ajax',
      url: 'degrees.json',
      reader: {
        type: 'json',
        rootProperty: 'degrees'
      }
    }
  }
});