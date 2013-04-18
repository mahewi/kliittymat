Ext.define('Suoritukset.view.Tutkinnot', {
    extend: 'Ext.dataview.List',
    config: {
        ui: 'round',
        title: 'Tutkinnot',
        setStyleHtmlContent: true,
        itemTpl: '{name}',
        grouped: true,
        store: 'opiskelijatstore',
        listeners: {
            itemtap: function () {
                Ext.Viewport.add({ xtype: 'tutkintoDialog' });

            }
        },
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
                            name: nimi,
                            label: nimi,
                            value: index
                        }));
                        kandilista.add(new Ext.create('Ext.field.Hidden', {
                            name: nimi+'-pisteet',
                            value: 1//palautaTutkintopisteet(nimi)
                        }));
                    }
                }
            }
        }
    }
});