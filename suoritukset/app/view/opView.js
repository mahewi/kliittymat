Ext.define('Suoritukset.view.opView', {
		extend: 'Ext.Container',
		xtype: 'opview',
		requires: ['Ext.util.DelayedTask','Ext.Panel','Ext.form.*','Ext.field.*'],
		
		config:{
			layout: 'hbox',
			title: 'Opiskelijat',
			items:[
				{
					xtype: 'formpanel',
					id: 'lomake',
					flex: 1,
					items:[
						{
							xtype: 'fieldset',
							title: 'Suodatusvalinnat',
							id: 'fs1',
							instructions: 'Valitse sopivat hakuehdot',
							items:[
								{
									xtype: 'textfield',
									name: 'nimi',
									label: 'Nimi'
								},
								{
									xtype: 'numberfield',
									name: 'nro',
									label: 'Opiskelijanro'
								},
								{
									xtype: 'selectfield',
									label: 'Aloitusvuosi',
									options:[
										{text: '', value: ''},
										{text: '2004', value: '2004'},
										{text: '2005', value: '2005'},
										{text: '2006', value: '2006'}
									]
								},
								{
									xtype: 'sliderfield',
									id: 'opSlider',
									label: 'Opintopisteet',
									values: [0,0],
									minValue: 0,
									maxValue: 300,
									listeners:{
										drag: function(){
											var slider = Ext.getCmp('opSlider');
											var values = slider.getValues();
											if(values[0]>values[1]){
												Ext.getCmp('A').setValue(values[1]);
												Ext.getCmp('B').setValue(values[1]);
											}else{
												Ext.getCmp('A').setValue(values[0]);
												Ext.getCmp('B').setValue(values[1]);
											}
										}
									}
								},
								{
									xtype: 'fieldset',
									layout: 'hbox',
									width: '100%',
									
									items:[
										{
											xtype: 'spacer',
											width: '30%'
										},
										{
											xtype: 'numberfield',
											id: 'A', 
											name: 'A',
											width: '35%',
											listeners:{
												change: function(){
													task.delay(500);
												}
											}
											
										},
										{
											xtype: 'numberfield',
											id: 'B',
											name: 'B',
											width:'35%',
											listeners:{
												change: function(){
													task.delay(500);
												}
											}
										}
									]
								},
								{
									xtype: 'panel',
									layout: 'hbox',
									defaults:{
										flex: 1
									},
									items:[
										{
											xtype: 'button',
											ui : 'decline',
											text: 'RESET',
											listeners:{
												tap: function(){
													var formpanel = Ext.getCmp('lomake');
													formpanel.reset();
												}
											}
										},
										{
											xtype: 'button',
											ui: 'confirm',
											text: 'SUBMIT',
											listeners: {
												tap: function(){
													var formpanel = Ext.getCmp('lomake');
													alert(formpanel.getValues());
												}
												
											}
										
										}
									]
								}
								
							]
						}
					]
				},
				{
					xtype: 'container',
					style: 'background-color: white;',
					id: 'tulokset',
					tpl: Ext.create('Ext.XTemplate',
            '<tpl for=".">',
                '<div>{title}</div>',
                '<table border="1">',
                    '<tpl for="rows">',
                    '<tr>',
                        '<tpl for="columns">',
                        '<td>{html}</td>',
                        '</tpl>',
                    '</tr>',
                    '</tpl>',
                '</table>',
            '</tpl>'
        ),
					flex: 2,
					data: [
                {
                    title: 'Header 1',
                    rows: [
                        {
                            columns: [
                                { html: 'column 1' },
                                { html: 'column 2' },
                                { html: 'column 3' }
                            ]
                        },
                        {
                            columns: [
                                { html: 'column 1' },
                                { html: 'column 2' },
                                { html: 'column 3' }
                            ]
                        }
                    ]
                },
                {
                    title: 'Header 2',
                    rows: [
                        {
                            columns: [
                                { html: 'column 1' },
                                { html: 'column 2' },
                                { html: 'column 3' }
                            ]
                        }
                    ]
                }
            ]
				}
			]
		}
});

var task = Ext.create('Ext.util.DelayedTask', function(){
	var min = Ext.getCmp('A');
	var max = Ext.getCmp('B');
	if(max<min){
		Ext.getCmp('opSlider').setValues();
	}
	Ext.getCmp('opSlider').setValues([Ext.getCmp('A').getValue(),Ext.getCmp('B').getValue()]);
});
