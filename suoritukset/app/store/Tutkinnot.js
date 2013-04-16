Ext.define("Suoritukset.store.Tutkinnot", {
  extend: "Ext.data.Store",
  config: {
    model: 'Suoritukset.model.Tutkinto',
    autoLoad: true,
    proxy: {
      type: 'ajax',
      url: 'courses.json',
      reader: {
        type: 'json',
        rootProperty: 'degrees'
      }
    }
  }
});