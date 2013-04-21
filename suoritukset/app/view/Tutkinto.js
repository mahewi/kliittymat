Ext.define('Suoritukset.view.Tutkinto', {
  extend: 'Ext.dataview.List',
  id: 'tutkinto',
  alias: 'widget.tutkintoDialog',
  xtype: 'tutkintoDialog',
  config: {
    fullscreen: true,
    floating: true,
    centered: true,
    modal: true,
    width: 300,
    height: 400,
    styleHtmlContent: true,
    itemTpl: '{code}',
    store: 'suoritusstore',
    ui: 'round',
    styleHtmlContent: true,
    sor
    items: [
    ]
  },
});


