Ext.define("Suoritukset.model.Suoritus", {
  extend: "Ext.data.Model",
  config: {
    fields: [
      {name: 'sid', type: 'int'},
      {name: 'date', type: 'string'}
    ],
    belongsTo: "Suoritukset.model.Kurssi"
  }
});