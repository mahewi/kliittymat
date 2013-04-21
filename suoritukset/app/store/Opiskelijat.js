Ext.define("Suoritukset.store.Opiskelijat", {
  extend: "Ext.data.Store",
  config: {
    storeId: 'opiskelijatstore',
    id: 'opiskelijatstore',
    model: 'Suoritukset.model.Opiskelija',
    autoLoad: true,
    sorters:[

    	{
    		property: 'points',
    		direction: 'DESC'

    	}
    ],
    proxy: {
      type: 'ajax',
      url: 'students.json',
      reader: {
        type: 'json'
      }
    },
    listeners: {
		load: function(store) {
			var av = Ext.getCmp('select');
			var vuodet = {}
			for (var i = 0; i < store.getCount(); i++) {
				vuodet[store.getAt(i).get('started')] = true;
			}
			var options = [{text: '', value: ''}];
			for (var i in vuodet) {
				options.push({text: i,  value: i});
			}
			av.setOptions(options);
			
			var os = Ext.getCmp('opSlider');
			var pojot = {}
			for (var i = 0; i < store.getCount(); i++) {
				pojot[store.getAt(i).get('points')] = store.getAt(i).get('points');
			}
			var apu = [];
			for (var i in pojot) {
				apu.push(pojot[i]);
			}			
			os.setMaxValue(apu[apu.length - 1]);
			os.setMinValue(apu[0]);
		}
  	}
  }
});