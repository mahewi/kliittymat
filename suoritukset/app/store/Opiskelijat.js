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
        type: 'json',
        rootProperty: 'students'
      }
    }
  }
});