Ext.define('Suoritukset.view.Main',{
	extend: 'Ext.Container',
    requires: ['Suoritukset.view.opView', 'Suoritukset.view.tView'],
	
    config: {
		fullscreen: true,
		items:[
			{
				xtype: 'titlebar',
				docked: 'top',
				title: 'Suoritukset',
				items:[
					{
						xtype: 'button',
						id: 'suodatusButton',
						text: 'Suodatus (32 opiskelijaa)',
						ui: 'action-round',
						style: 'color: white',
						iconCls: 'arrow_down',
						iconMask: true,
						listeners:{
							tap: function(){
								if(suodatusPanel.isHidden()){
									suodatusPanel.showBy(Ext.getCmp('suodatusButton'));
									this.setIconCls('arrow_up');
								}else{
									suodatusPanel.hide();
									this.setIconCls('arrow_down');
								}
								
							}
						}
						
					}
				]
			}
		]
	}

});
var suodatusPanel = Ext.create('Ext.Panel',{
					
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
									id: 'nimi',
									name: 'nimi',
									label: 'Nimi'
								},
								{
									xtype: 'numberfield',
									name: 'nro',
									id: 'nro',
									label: 'Opiskelijanro'
								},
								{
									xtype: 'selectfield',
									id: 'select',
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
												task.delay(500);
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
													Ext.getCmp('nimi').reset();
													Ext.getCmp('nro').reset();
													Ext.getCmp('select').reset();
													Ext.getCmp('A').reset();
													Ext.getCmp('B').reset();
													Ext.getCmp('opSlider').reset();
													
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
				
				
	
}).hide();

var task = Ext.create('Ext.util.DelayedTask', function(){
	var min = Ext.getCmp('A');
	var max = Ext.getCmp('B');
	if(max<min){
		Ext.getCmp('opSlider').setValues();
	}
	Ext.getCmp('opSlider').setValues([Ext.getCmp('A').getValue(),Ext.getCmp('B').getValue()]);
});