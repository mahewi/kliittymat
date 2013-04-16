Ext.define("Suoritukset.store.Suoritukset", {
  extend: "Ext.data.Store",
  config: {
    storeId: 'suoritusstore',
    id: 'suoritusstore',
    model: 'Suoritukset.model.Suoritus',
    autoLoad: true,
    proxy: {
      type: 'ajax',
      url: 'suoritukset.json',
      reader: {
        type: 'json',
      }
    }
  }
});