Ext.define('Suoritukset.view.Kurssi', {
  extend: 'Ext.Panel',
  id: 'kurssi',
  alias: 'widget.kurssiDialog',
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