Ext.define("Suoritukset.model.Opiskelija", {
  extend: "Ext.data.Model",
  config: {
    fields: [
      { name: "id", type: "int" },
      { name: "started", type: "string" },
      { name: "name", type: "string" },
      { name: "points", type: "int" },
      { name: "dprogram", type: "string" },
      { name: "major", type: "string" }
    ]
  }
});