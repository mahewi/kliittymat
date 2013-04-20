Ext.define('Suoritukset.view.Tutkinto', {
  extend: 'Ext.form.Panel',
  id: 'tutkinto',
  alias: 'widget.tutkintoDialog',
  xtype: 'tutkintoDialog',
  konstruoiSisalto: function(opiskelija){
  },
  config: {
  	floating: true,
    centered: true,
    modal: true,
    width: 300,
    height: 400,
    styleHtmlContent: true,
    items: [{
      xtype: 'toolbar',
      title: 'PopUp',
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
    }]
  },
});


