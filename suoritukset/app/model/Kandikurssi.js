Ext.define("Suoritukset.model.Kandikurssi", {
	extend "Ext.data.Model",
	config: {
		fields: [
			{name: "code", type: "string"},
			{name: "id", type: "int"}
			],
	}
});