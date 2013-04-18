Ext.define("Suoritukset.model.Kandikurssi", {
	extend: "Ext.data.Model",
	config: {
		fields: [
			{name: "kurssitunnus", type: "string"},
			{name: "kandiId", type: "int"}
			]
	}
});