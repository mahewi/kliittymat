Ext.define('Suoritukset.view.Kurssi', {
  extend: 'Ext.Panel',
  id: 'kurssi',
  alias: 'widget.kurssiDialog',
  config: {
    floating: true,
    centered: true,
    modal: true,
    width: 600,
    height: 400,
    styleHtmlContent: true,
    items: [
      {
        xtype: 'toolbar',
        title: 'osallistujat',
        docked: 'bottom',
        items: [
          {
            xtype: 'spacer'
          },{
            text: 'sulje',
            handler: function(){
              Ext.getCmp('kurssi').destroy();
            }
          }],
      },{
        xtype: 'container',
        height: "100%",
        layout: {type:'vbox',pack:'center',align:'strech'},
        listeners: {
          painted: function() {
            var suoritusStore = Ext.getStore('suoritusstore')
            suoritusStore.filter('code',selectedCourseCode)
            yearlyStudents = {}
            for(var i = 0; i < suoritusStore.getCount(); i++){
              var year = suoritusStore.getAt(i).get('date').substr(-4)
              if(typeof(yearlyStudents[year]) == 'undefined') yearlyStudents[year] = 0
              yearlyStudents[year]++
            }
            studentsByYear = {
              fields: ['year','students'],
              data: []
            }
            for(i in yearlyStudents){
              studentsByYear.data.push({year:i,students:yearlyStudents[i]})
            }
            chart.store = studentsByYear
            this.add(chart)
          }
        }
      }
    ]
  }
});

// Maaritetaan kaavio (ilman dataa)
var chart = {
    xtype: "chart",
    flex: 1,
    axes: [
      {
      type: 'numeric',
      position: 'left',
      title: {
        text: 'Opiskelijoita kurssilla',
        fontSize: 12,
      },
      titleMargin: 20,
      fields: 'students'
    },
    {
      type: 'category',
      position: 'bottom',
      title: {
        text: 'Vuosi',
        fontSize: 15
      },
      fields: 'year'
    }
    ],
    series: [
      {
      type: 'bar',
      xField: 'year',
      yField: 'students',
      style: {
        fill: 'red'
      }
    }
    ]
};
