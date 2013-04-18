Ext.define('Suoritukset.view.Kurssit', {
  extend: 'Ext.dataview.List',
	require: ['Suoritukset.view.Kurssi'],
  config: {
      ui: 'round',
      grouped: true,
      fullscreen: true,
      id: 'kurssilista',
      title: 'Kurssit',
      setStyleHtmlContent: true,
      itemTpl:
        '<tpl for="."><div class="Kurssi">' +
        '  {name}<br /><small>{code}</small>' +
        '</div></tpl>',
      store: 'kurssitstore',
      listeners:{
        painted: suodataLista,
      	itemtap: function(record, index){
          Ext.Viewport.add({xtype:'kurssiDialog'});
        }
      }
  }
});
function suodataLista(){
	var kurssikoodilista = haeSuoritukset();
	Ext.getStore('kurssitstore').filter(
		Ext.create('Ext.util.Filter',{
			filterFn: function(record){
			if(kurssikoodilista.indexOf(record.get('code')) == -1 ){
        			return false;
        		} else {
        			return true;
        		}
			}
		})
	);
};
function haeSuoritukset(){

    var opStore = Ext.getStore('opiskelijatstore');
    var suoritusStore = Ext.getStore('suoritusstore');
    var kurssikoodilista = new Array();

    for (var i=0 ; i < opStore.getCount(); i++) {
        var opiskelijaId = opStore.getAt(i).get('id');
        for (var j=0 ; j < suoritusStore.getCount(); j++) {
             var sid = suoritusStore.getAt(j).get('sid');
             if (opiskelijaId == sid) {
                if (kurssikoodilista.indexOf(suoritusStore.getAt(j).get('code')) == -1) {
                    kurssikoodilista.push(suoritusStore.getAt(j).get('code'));
                }
             }
        }
    }
    return kurssikoodilista;
}

