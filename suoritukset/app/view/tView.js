Ext.define('Suoritukset.view.tView',{
	extend: 'Ext.TabPanel',
	xtype: 'tview',
	
	config:{
		fullscreen: true,
		items:[
			{
				title: 'YKSI',
				style: 'background-color: #33B5E5'
			},
			{
				title: 'UNIONI',
				style: 'background-color: #AA66CC'
			},
			{
				title: 'UNIVERSAALI',
				style: 'background-color: #CC0000'
			}
		
		]
	}
});