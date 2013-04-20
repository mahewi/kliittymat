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

function palautaTutkintoPisteet(tutkintoId) {
  var kurssitStore = Ext.getStore('kurssitstore');
  var kandiKurssitStore = Ext.getStore('kandikurssitstore');

  var pisteet = 0;

  console.log(kurssitStore.getCount());

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
  // karsitaan listoja
  suoritusStore.filter('sid',opId)
  kandiKurssitStore.filter('kandiId',kandiId)
  var points = 0;
  for(var i = 0; i < suoritusStore.getCount(); i++){
    kurssi = kurssitStore.getAt(i)
    if(kandiKurssitStore.find('kurssitunnus',kurssi.get('code')) != -1){
      points+=kurssi.get('points')
    }
  }
  return points
}

