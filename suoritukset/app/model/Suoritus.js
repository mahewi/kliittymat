Ext.define("Suoritukset.model.Suoritus", {
  extend: "Ext.data.Model",
  config: {
    fields: [
      {name: 'sid', type: 'int'},
      {name: 'code', type: 'string'},
      {name: 'date', type: 'string'}
    ]
  }
});