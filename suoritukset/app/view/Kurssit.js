Ext.define('Suoritukset.view.Kurssit', {
	extend: 'Ext.dataview.List',
    config: {
    	items:[
    		{
    			xtype: 'titlebar',
    			docked: 'top',
    			ui: 'dark',
    			items:[
    				{
    					xtype: 'searchfield',
    					align: 'right',
    					placeHolder: '  Etsi...',
    					listeners:{
    						clearicontap: onSearchClearIconTap,
    						keyup: onSearchKeyUp
    					}
    				}
    			]
    		}
    	],
    	ui: 'round',
    	grouped: true,
        fullscreen: true,
        id: 'kurssilista',
        title: 'Kurssit',
        setStyleHtmlContent: true,
        itemTpl: 
          '<tpl for="."><div class="Kurssi">' +
          '  {name}<br /><small>{code}</small>' +
          '  <tpl for="students"><br /><small>{sid}</small></tpl>' +
          '</div></tpl>',
        store: 'kurssitstore',
        listeners:{
        	// Ei toimi. Vielä...
            //initialize: suodataLista
        }
    }

});
function suodataLista(){
	var kStore = Ext.getStore('kurssitstore');
	var opStore = Ext.getStore('opiskelijatstore');
	kStore.filter(
		Ext.create('Ext.util.Filter', {
			filterFn: function(item){ // FUNKTIO PALAUTTAA ARVON TRUE TAI FALSE!! == true mikäli filtteröidystä opStoresta löytyy kStoren yksikin opiskelija.
				var suoritukset = item.students();
				for(var i = 0 ; i<suoritukset.getCount();i++){
					for(var j = 0 ; j<opStore.getCount();j++){
						if(opStore.getData()[j].get('id') == suoritukset.getData()[i].get('sid')){
							return true;
						}
					}
				}
			}
		})
	);
		
};
function onSearchKeyUp(field){
    var value = field.getValue(),
    	store = Ext.getStore('kurssitstore');
    store.clearFilter();
    	
    if(value){
    	var searches = value.split(' '),
    		regexps = [],
    		i;
    			
    	for(i = 0; i<searches.length;i++){
    		if(!searches[i])continue;
    			
    		regexps.push(new RegExp(searches[i],'i'));
    			
    	}
    		
    	store.filter(function(record){
    		var matched = [];
    		for(i = 0; i<regexps.length;i++){
    			var search = regexps[i],
    				didMatch = record.get('name').match(search)||record.get('code').match(search);
    			matched.push(didMatch);
    		}
    		if(regexps.length>1&&matched.indexOf(false)!=-1){
    			return false;
    		}else{
    			return matched[0];
    		}
    			
    	})
    }
    
};
function onSearchClearIconTap(){
    Ext.getStore('kurssitstore').clearFilter();
    //Ext.getStore('kurssitstore').suodataLista();
};