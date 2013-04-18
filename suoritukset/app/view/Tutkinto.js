Ext.define('Suoritukset.view.Tutkinto', {
  extend: 'Ext.Panel',
  id: 'tutkinto',
  alias: 'widget.tutkintoDialog',
  config: {
  	floating: true,
    centered: true,
    modal: true,
    width: 300,
    height: 400,
    styleHtmlContent: true,
    html: 'Hello! I\'m a PopUp',
    items: [{
      xtype: 'toolbar',
      title: 'PopUp',
      items: [{
          xtype: 'spacer'
        },{
          text: 'Close',
          handler: function(){
            Ext.getCmp('kurssi').destroy();
          }
        }],
    }]
  }
});