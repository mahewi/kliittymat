Ext.define('Ohjelmointityö.view.Main',{
	extend: 'Ext.navigation.View',
    requires: ['Ohjelmointityö.view.opView', 'Ohjelmointityö.view.tView'],
	
    config: {
		fullscreen: true,
		title: 'Ohjelmointityö',
		id: 'naviview',
		items:[
			// tämä on alkuvalikko
			{
				xtype : 'container',
				style: 'background-color: black;',
				title: 'Ohjelmointityö',
				layout:{
					type: 'vbox',
					pack: 'center',
					
					align: 'center'
				},
				items:[
					{
						xtype: 'button',
						text: 'Opiskelijat',
						maxWidth: '1000px',
						maxHeight: '200px',
						width: '94%',
						height: '30%',
						ui: 'confirm',
						handler: function(){
							var view = Ext.getCmp('naviview');
							view.push(new Ohjelmointityö.view.opView);
						}
					},
					{
						xtype: 'button',
						text: 'Kurssit',
						maxWidth: '1000px',
						maxHeight: '200px',
						width: '94%',
						height: '30%',
						ui: 'action',
						style: 'color: white',
						
					},
					{
						xtype: 'button',
						text: 'Tutkinnot',
						maxWidth: '1000px',
							maxHeight: '200px',
						width: '94%',
						height: '30%',
						ui: 'decline',
						handler: function(){
							var view = Ext.getCmp('naviview');
							view.push(new Ohjelmointityö.view.tView);
						}
					}
				]
			}
		]
	}

});
