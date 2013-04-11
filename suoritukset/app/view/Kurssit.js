Ext.define('Suoritukset.view.Kurssit', {
    extend: 'Ext.dataview.List',
    config: {
        fullscreen: true,
        id: 'kurssilista',
        title: 'Suoritukset',
        setStyleHtmlContent: true,
        itemTpl: '<tpl for="."><div class="Kurssi">' +
  '  {name}, <strong>{code}</strong>' +
  '  <tpl for="students"><br /><small>{sid}</small></tpl>' +
  '</div></tpl>',
        store: 'kurssitstore'
    }

});