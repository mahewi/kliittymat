Ext.define('Suoritukset.view.Tutkinnot', {
  extend: 'Ext.dataview.List',
  requires: ['Suoritukset.view.Tutkinto'],
  config: {
    ui: 'round',
    title: 'Tutkinnot',
    id: 'opiskelijaLista',
    setStyleHtmlContent: true,
    itemTpl: '<div class="listItem">{name}</div>',
    store: 'opiskelijatstore',
    listeners: {
      painted: function(){
        valitutKandit = new Array()
      },
      itemtap: function (dataview, index, target, record, e, eOpts) {
        var tStore = Ext.getStore('tutkinnotstore')
        var suoritusstore = Ext.getStore('suoritusstore')
        suoritusstore.clearFilter()
        suoritusstore.filter('sid',record.get('id'))
        var fs = Ext.create('Ext.form.FieldSet',{
          docked: 'top'
        })
        var toolbar = Ext.create('Ext.Toolbar',{
          title: record.get('name'),
          docked: 'top',
          items: [
            {
            xtype: 'spacer'
          },
          {
            iconCls: 'delete',
            iconMask: true,
            handler: function(){
              Ext.getCmp('tutkinto').destroy();
              Ext.getStore('suoritusstore').clearFilter();
            }
          }
          ]
        });
        fs.add(toolbar)

        for(var i = 0; i<valitutKandit.length;i++){
          var kandi = valitutKandit[i]
          var index = tStore.find('id',kandi)
          var value = haeOpintopisteet(kandi,record.get('id'))
          value = value / palautaTutkintoPisteet(kandi)
          value = (value * 100) 
          value = Math.round(value*100)/100 
          fs.add(Ext.create('Ext.Button',{
            ui: 'action',
            html: '<strong>'+tStore.getAt(index).get('name')+'</strong><strong style="align: right">'+'   '+value + ' %</strong>',
            text: kandi,
            listeners: {
              tap: function(btn,e,eOpts){
                var kandiKurssitStore = Ext.getStore('kandikurssitstore')
                var suoritusStore = Ext.getStore('suoritusstore')
                kandiKurssitStore.clearFilter()
                suoritusStore.clearFilter()
                kandiKurssitStore.filter('kandiId',btn.getText())
                suoritusStore.filter('sid',record.get('id'))
                suoritusStore.filter(new Ext.util.Filter({
                  filterFn: function(item){
                    return kandiKurssitStore.find('kurssitunnus',item.get('code')) != -1
                  }
                }))
              }
            }
          }))
        }
        Ext.Viewport.add(new Suoritukset.view.Tutkinto({items:fs}));
      },
      initialize: function(cmp){
        showList(false, Ext.getStore('opiskelijatstore'), Ext.getCmp('opiskelijaLista'))
      }
    },
    items:[{
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
                  var index = 0;
                  var kandit = kandilista.getItems()
                  var opiskelijaLista = Ext.getCmp('opiskelijaLista');
                  var opiskelijatStore = Ext.getStore('opiskelijatstore')
                  somethingChecked = false;
                  for(var i = 0; i < kandit.getCount(); i++){
                    checkedStatus = kandit.getAt(i)._checked
                    if(typeof(checkedStatus) != 'undefined'){
                      if(checkedStatus) somethingChecked = true
                    }
                  }
                  showList(somethingChecked,opiskelijatStore,opiskelijaLista)
                  if(newVal == true){
                    for(var i = 0; i<opiskelijatStore.getCount();i++){
                      var opiskelija = opiskelijatStore.getAt(i);
                      opiskelija.set('kandipoints',opiskelija.get('kandipoints') + haeOpintopisteet(cb.getValue(),opiskelija.get('id')));
                    }
                    opiskelijatStore.sort({property: 'kandipoints',direction: 'DESC'});
                  }else{
                    valitutKandit.splice(valitutKandit.indexOf(cb.getValue()),1)
                    for(var i = 0; i<Ext.getStore('opiskelijatstore').getCount();i++){
                      var opiskelija = Ext.getStore('opiskelijatstore').getAt(i);
                      opiskelija.set('kandipoints',opiskelija.get('kandipoints') - haeOpintopisteet(cb.getValue(),opiskelija.get('id')));
                    }
                    opiskelijatStore.sort({property: 'kandipoints',direction:'DESC'});
                    opiskelijatStore.sort({property: 'points',direction: 'DESC'});
                  }
                }
              }
            }));
          }
        }
      }
    },{
      xtype: 'container',
      style: {padding: '0px 20px 0px 20px'},
      docked: 'top',
      id: 'tyhjateksti',
      html: '<br /> Valitse ylh&auml;&auml;lt&auml; mit&auml; kandirakenteita vasten opiskelijoita listataan. Lista j&auml;rjestet&auml;&auml;n opintopisteiden m&auml;&auml;r&auml;n mukaan laskevaan j&auml;rjestykseen.'
    }]
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
  // karsitaan listoja
  kandiKurssitStore.clearFilter()
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
  return points
}
function showList(bool,opiskelijatStore,opiskelijaLista){
  // haetaan viimeinen sivulle piirrettu hommeli
  var pageElements = opiskelijaLista.getItems()
  var listElement = opiskelijaLista.getItems().items[pageElements.getCount()-1]
  if(!bool){
    listElement.hide()
    Ext.getCmp('tyhjateksti').show()
  } else {
    listElement.show()
    Ext.getCmp('tyhjateksti').hide()
  }
  opiskelijaLista.refresh()
}

var valitutKandit = new Array();
