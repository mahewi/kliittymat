Ext.define('Suoritukset.view.Tutkinnot', {
    extend: 'Ext.dataview.List',
    config: {
        ui: 'round',
        title: 'Tutkinnot',
        setStyleHtmlContent: true,
        itemTpl: '{name}',
        grouped: true,
        store: 'opiskelijatstore',
        items: {
            xtype: 'fieldset',
            id: 'kandiLista',
            docked: 'top',
            listeners: {
                initialize: function () {
                    var kandilista = Ext.getCmp('kandiLista');
                    var tStore = Ext.getStore('tutkinnotstore');
                    for (var i = 0; i < tStore.getCount(); i++) {
                        var nimi = tStore.getAt(i).get('name');
                        var index = tStore.getAt(i).get('id');
                        kandilista.add(new Ext.create('Ext.field.Checkbox', {
                            name: index,
                            label: nimi,
                            value: index
                        }));
                    }
                }
            }
        }
    }
});
/*Ext.define('Suoritukset.view.Tutkinnot', {
    extend: 'Ext.Container',
    config: {
        layout: 'hbox',
        title: 'Tutkinnot',
        items: [
            {
                // field, jossa togglenappuloita, jokaista tutkintoa varten

                xtype: 'fieldset',
                id: 'fieldisettii',
                docked: 'left',
                flex: 1,
                items: [
                    {
                        xtype: 'checkboxfield',
                        name: 'kandi1',
                        label: 'Kandi1',
                        value: 'kandi1',
                        checked: true,
                        labelWidth: '50%'
                    },
                    {
                        xtype: 'checkboxfield',
                        name: 'kandi2',
                        label: 'Kandi2',
                        value: 'kandi2',
                        labelWidth: '50%'
                    },
                    {
                        xtype: 'checkboxfield',
                        name: 'kandi3',
                        label: 'Kandi3',
                        value: 'kandi3',
                        labelWidth: '50%'
                    },
                ]


            },
            {
                // listausopiskelijoista
                xtype: 'list',
                flex: 2.5,
                store: Ext.getStore('opiskelijatstore'),
                itemTpl:'<tpl for='.'>{name}</tpl>'
            }

        ]
    }
	
});*/
function haeOpintopisteet(kandiId, opId) {
	
	var kandiKurssitStore = Ext.getStore('kandikurssitstore')
	var suoritusStore = Ext.getStore('suoritusstore')
	var kurssitStore = Ext.getStore('kurssitstore')
	var pisteet = 0
	var ktunnukset = []
	
	if (kandiId == 0) {
		for(var i = 0; i < suoritusStore.getCount(); i++) {
			var op = suoritusstore.getAt(i).get('sid')
			if (op == opId) {
				var ktunnus = suoritusstore.getAt(i).get('code')				
				for(var j = 0; j < kurssitStore.getCount(); j++) {
					if (ktunnus == kurssitStore.getAt(j).get('code')) {
						pisteet = pisteet + kurssitStore.getAt(j).get('points')
						break
					}
				}
			}	
		}
	}
	else {
		for (var i = 0; i < kandiKurssitStore.getCount(); i++) {
			if (kandiId == kandiKurssitStore.getAt(i).get('kandiId')) {
				for (var j = 0; j < suoritusStore.getCount(); j++) {
					if (opId == suoritusStore.getAt(j).get('sid') && kandiKurssitStore.getAt(i).get('kurssitunnus') == suoritusStore.getAt(j).get('code')) { 
						for (var z = 0; z < kurssitStore.getCount(); z++) {
							if (suoritusStore.getAt(j).get('code') == kurssitStore.getAt(z).get('code')) {
								pisteet = pisteet + kurssitStore.getAt(z).get('points')
							}
						}
					}
				}
			}
		}
	}
}

