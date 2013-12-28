// var sub1 = require("js/sub");

Ext.onReady(function () {
		
	var vp = Ext.create('Ext.container.Viewport', {
			layout: 'border',
			items: [{
				region: 'north',
				margins: 5,
				height: 100,
				xtype: 'container'
			}, {
				title: 'West',
				region: 'west',
				margins: '0 5 0 5',
				flex: .3,
				collapsible: true,
				split: true,
				titleCollapse: true
			}, {
				title: 'Center',
				region: 'center'
			}, {
				title: 'East',
				region: 'east',
				margins: '0 5 0 5',
				width: 200,
				collapsible: true,
//                        collapsed: true
			}, {
				title: 'South',
				region: 'south',
				margins: '0 5 5 5',
				flex: .3,
				split: true
			}]
	});
	
});

