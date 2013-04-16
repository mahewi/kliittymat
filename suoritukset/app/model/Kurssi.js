Ext.define("Suoritukset.model.Kurssi", {
  extend: "Ext.data.Model",
  config: {
    fields: [
      {name: "code", type: "string"},
      {name: "name", type: "string"},
      {name: "points", type: "int"} 
    ],
    hasMany: {model: "Suoritukset.model.Suoritus", name: 'students'}
  }
});