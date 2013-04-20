
Ext.define('Suoritukset.view.Tutkinnot', {
    extend: 'Ext.dataview.List',
    config: {
        ui: 'round',
        title: 'Tutkinnot',
        setStyleHtmlContent: true,
        itemTpl: '{name}',
        store: 'opiskelijatstore',
        listeners: {
            itemtap: function (dataview, index, target, record, e, eOpts) {
                var tStore = Ext.getStore('tutkinnotstore');
                var fs = Ext.create('Ext.form.FieldSet')
                fs.add(Ext.create('Ext.Toolbar',{
                    title: record.get('name'),
                    items: [
                    {
                        xtype: 'spacer'
                    },
                    {
                        iconCls: 'delete',
                        iconMask: true,
                        handler: function(){
                            Ext.getCmp('tutkinto').destroy();
                        }
                    }
                    ],
                }))
                for(var i = 0 ; i<tStore.getCount();i++){
                    var value = haeOpintopisteet(tStore.getAt(i).get('id'),record.get('id'))
                    value = value / Ext.getCmp(tStore.getAt(i).get('name')+'HIDDEN').getValue()

                    value = (value * 100)
                    value = Math.round(value*Math.pow(10,2))/Math.pow(10,2)


                    fs.add(Ext.create('Ext.field.Text',{
                        label: tStore.getAt(i).get('name'), 
                        value: value + ' %',
                        disabled: true,
                        disabledCls: null
                    }))

                }

                

                Ext.Viewport.add(new Suoritukset.view.Tutkinto().setItems(fs))
            }
        },
        items: {
            xtype: 'fieldset',
            id: 'kandiLista',
            docked: 'top',
            listeners: {
                painted: function () {
                    var kandilista = Ext.getCmp('kandiLista');
                    var tStore = Ext.getStore('tutkinnotstore');
                    for (var i = 0; i < tStore.getCount(); i++) {
                        var nimi = tStore.getAt(i).get('name');
                        var index = tStore.getAt(i).get('id');
                        kandilista.add(new Ext.create('Ext.field.Checkbox', {
                            name: nimi,
                            id: nimi + 'NAME',
                            label: nimi,
                            value: index,
                            listeners:{
                                change: function(cb,newVal,oldVal, eOpts){
                                    if(newVal == true){
                                        for(var i = 0; i<Ext.getStore('opiskelijatstore').getCount();i++){
                                            var opiskelija = Ext.getStore('opiskelijatstore').getAt(i);
                                            opiskelija.set('kandipoints',opiskelija.get('kandipoints') + haeOpintopisteet(cb.getValue(),opiskelija.get('id')));
                                        }
                                        Ext.getStore('opiskelijatstore').sort({property: 'kandipoints'});
                                    }else{
                                        for(var i = 0; i<Ext.getStore('opiskelijatstore').getCount();i++){
                                            var opiskelija = Ext.getStore('opiskelijatstore').getAt(i);
                                            opiskelija.set('kandipoints',opiskelija.get('kandipoints') - haeOpintopisteet(cb.getValue(),opiskelija.get('id')));
                                        }
                                        Ext.getStore('opiskelijatstore').sort({property: 'kandipoints',direction:'DESC'});
                                        Ext.getStore('opiskelijatstore').sort({property: 'points',direction: 'DESC'});
                                    }
                                }
                            }
                        }));
                        kandilista.add(new Ext.create('Ext.field.Hidden', {
                            name: nimi+'-pisteet',
                            id: nimi + 'HIDDEN',
                            value: palautaTutkintoPisteet(index)
                        }));
                    }
                }
            }
        }
    }

});

function palautaTutkintoPisteet(tutkintoId) {
  var kurssitStore = Ext.getStore('kurssitstore');
  var kandiKurssitStore = Ext.getStore('kandikurssitstore');
  var pisteet = 0;
  for (var i=0 ; i < kandiKurssitStore.getCount() ; i++) {
    if (kandiKurssitStore.getAt(i).get('kandiId') == tutkintoId) {
      for (var j= 0 ; j < kurssitStore.getCount() ; j++) {
        if (kurssitStore.getAt(j).get('code') == kandiKurssitStore.getAt(i).get('kurssitunnus')) {
          pisteet = pisteet + kurssitStore.getAt(j).get('points')
        }
      }
    }
  }
  return pisteet;
}


function haeOpintopisteet(kandiId, opId) {
  var kandiKurssitStore = Ext.getStore('kandikurssitstore')
  var suoritusStore = Ext.getStore('suoritusstore')
  var kurssitStore = Ext.getStore('kurssitstore')
  kurssitStore.clearFilter(true)
  suoritusStore.clearFilter(true)
  kandiKurssitStore.clearFilter(true)
  // karsitaan listoja
  suoritusStore.filter('sid',opId)
  kandiKurssitStore.filter('kandiId',kandiId)
  var points = 0;
  for(var i = 0; i < suoritusStore.getCount(); i++){
    suoritus = suoritusStore.getAt(i)
    var suoritettuKurssi = suoritus.get('code')
    if(kandiKurssitStore.find('kurssitunnus',suoritettuKurssi) != -1){
      kurssinIndeksi = kurssitStore.find('code',suoritettuKurssi)
      kurssi = kurssitStore.getAt(kurssinIndeksi)
      points+=kurssi.get('points')
    }
  }
  kurssitStore.clearFilter(true)
  suoritusStore.clearFilter(true)
  kandiKurssitStore.clearFilter(true)
  return points
}