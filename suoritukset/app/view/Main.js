Ext.define('Suoritukset.view.Main', {
  extend: 'Ext.navigation.View',
  requires: ['Suoritukset.view.Kurssit', 'Suoritukset.store.Opiskelijat'],
  config: {
    fullscreen: true,
    setStyleHtmlContent: true,
    ui: 'dark',
    id: 'naviview',
    defaultBackButtonText: 'Edellinen',
    items: [
      {
      xtype: 'container',
      title: 'Suoritukset',
      layout: {
        type: 'vbox',
        pack: 'center',
        align: 'center'
      },
      items: [
        {
        xtype: 'button',
        text: 'Kurssit',
        maxWidth: '1000px',
        maxHeight: '200px',
        width: '94%',
        height: '30%',
        ui: 'round',
        listeners: {
          tap: function () {
            Ext.getCmp('naviview').push(new Ext.create('Suoritukset.view.Kurssit'));
          }
        }
      }, {
        xtype: 'button',
        text: 'Tutkinnot',
        maxWidth: '1000px',
        maxHeight: '200px',
        width: '94%',
        height: '30%',
        ui: 'action-round',
        listeners: {
          tap: function () {
            Ext.getCmp('naviview').push(new Ext.create('Suoritukset.view.Tutkinnot'));
          }
        }
      }
      ]
    }
    ],
    navigationBar: {
      docked: 'top',
      items: [
        {
        xtype: 'button',
        id: 'suodatusButton',
        text: 'Suodatus',
        ui: 'action-round',
        style: 'color: white',
        iconCls: 'arrow_down',
        iconMask: true,
        listeners: {
          painted: function () {
            Ext.getCmp('suodatusButton').setText('Suodatus (Opiskelijat ' + Ext.getStore('opiskelijatstore').getCount() + ')');
          },
          tap: function () {
            if (suodatusPanel.isHidden()) {
              suodatusPanel.showBy(Ext.getCmp('suodatusButton'));
              this.setIconCls('arrow_up');
            } else {
              suodatusPanel.hide();
              this.setIconCls('arrow_down');
            }
          }
        }
      }
      ]
    }
  }
});
var suodatusPanel = Ext.create('Ext.Panel', {
  id: 'lomake',
  title: 'Suodatus',
  ui: 'neutral',
  hidden: true,
  flex: 1,
  items: [
    {
    xtype: 'fieldset',
    title: 'Suodatusvalinnat',
    id: 'fs1',
    instructions: 'Valitse sopivat hakuehdot',
    items: [
      {
      xtype: 'textfield',
      id: 'etunimi',
      name: 'etunimi',
      label: 'Etunimi'
    }, {
      xtype: 'textfield',
      id: 'sukunimi',
      name: 'sukunimi',
      label: 'Sukunimi'
    }, {
      xtype: 'numberfield',
      name: 'nro',
      id: 'nro',
      label: 'Opiskelijanro'
    }, {
      xtype: 'selectfield',
      id: 'select',
      label: 'Aloitusvuosi',
      options: [{text :'', value: ''}
      ]
    }, {
      xtype: 'sliderfield',
      id: 'opSlider',
      label: 'Opintopisteet',
      minValue: 0,
      maxValue: 300,
      values: [null, null],
      listeners: {
        drag: function () {
          var slider = Ext.getCmp('opSlider');
          var values = slider.getValues();
          if (values[0] > values[1]) {
            Ext.getCmp('A').setValue(values[1]);
            Ext.getCmp('B').setValue(values[1]);
            task.delay(500);
          } else {
            Ext.getCmp('A').setValue(values[0]);
            Ext.getCmp('B').setValue(values[1]);
          }
        }
      }
    }, {
      xtype: 'fieldset',
      layout: 'hbox',
      width: '100%',
      items: [
        {
        xtype: 'spacer',
        width: '30%'
      }, {
        xtype: 'numberfield',
        id: 'A',
        name: 'A',
        width: '35%',
        listeners: {
          change: function () {
            task.delay(500);
          }
        }
      }, {
        xtype: 'numberfield',
        id: 'B',
        name: 'B',
        width: '35%',
        listeners: {
          change: function () {
            task.delay(500);
          }
        }
      }
      ]
    }, {
      xtype: 'panel',
      layout: 'hbox',
      defaults: { flex: 1 },
      items: [
        {
        xtype: 'button',
        ui: 'decline',
        text: 'RESET',
        listeners: {
          tap: function () {
            Ext.getCmp('etunimi').reset();
            Ext.getCmp('sukunimi').reset();
            Ext.getCmp('nro').reset();
            Ext.getCmp('select').reset();
            Ext.getCmp('A').reset();
            Ext.getCmp('B').reset();
            Ext.getCmp('opSlider').reset();
            Ext.getStore('opiskelijatstore').clearFilter();
            Ext.getStore('kurssitstore').clearFilter();
            Ext.getCmp('suodatusButton').setText('Suodatus (Opiskelijat ' + Ext.getStore('opiskelijatstore').getCount() + ')');
          }
        }
      }, {
        xtype: 'button',
        ui: 'confirm',
        text: 'SUBMIT',
        listeners: {
          tap: function () {
            suodatusPanel.hide();
            Ext.getCmp('suodatusButton').setIconCls('arrow_down');
            var store = Ext.getStore('opiskelijatstore');
            store.clearFilter();

            var enimi = Ext.getCmp('etunimi');
            var snimi = Ext.getCmp('sukunimi');

            var nro = Ext.getCmp('nro');
            var select = Ext.getCmp('select');
            var a = Ext.getCmp('A');
            var b = Ext.getCmp('B');
            var fs1 = Ext.getCmp('fs1');
            var items = fs1.getItems();
            if (enimi.getValue() != '' && snimi.getValue() != '') {
              store.filter(new Ext.util.Filter({ property: 'name', value: snimi.getValue() + ' ' + enimi.getValue() }));
            }
            if (select.getValue() != '') {
              store.filter(new Ext.util.Filter({ property: 'started', value: select.getValue() }));
            }
            if (nro.getValue() != null) {
              store.filter(new Ext.util.Filter({ property: 'id', value: nro.getValue() }));
            }
            if (b.getValue() != null) {
              store.filter(
                Ext.create('Ext.util.Filter', {
                filterFn: function (item) {
                  return item.get("points") >= a.getValue() && item.get("points") <= b.getValue();
                }
              })
              );
            }
            Ext.getCmp('suodatusButton').setText('Suodatus (Opiskelijat ' + Ext.getStore('opiskelijatstore').getCount() + ')');
            Ext.getStore('kurssitstore').clearFilter();
            suodataLista();
          }
        }
      }
      ]
    }
    ]
  }
  ]
});

var task = Ext.create('Ext.util.DelayedTask', function(){
  var min = Ext.getCmp('A');
  var max = Ext.getCmp('B');
  if(max<min){
    Ext.getCmp('opSlider').setValues();
  }
  Ext.getCmp('opSlider').setValues([Ext.getCmp('A').getValue(),Ext.getCmp('B').getValue()]);
});
