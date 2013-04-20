Ext.define("Suoritukset.model.Tutkinto", {
  extend: "Ext.data.Model",
  config: {
    fields: [
      {name: 'id', type: 'string'},
      {name: 'name', type: 'string'}
    ]
  }
});