var EX = exports;

EX.vp = {};

EX.build = function( tb ){

	console.log('build work form');  
	
	EX.vp = Ext.create('Ext.container.Viewport', {
			layout: 'border',
			items: [{
				region: 'north',
				margins: 0,
				height: 30,
				xtype: 'container'
			}, {
				title: 'Source explore',
				region: 'west',
				margins: '0 5 0 5',
				flex: .3,
				collapsible: true,
				split: true,
				titleCollapse: true
			}, {
				title: 'Code',
				region: 'center'
			}, {
				title: 'Help',
				region: 'east',
				margins: '0 5 0 5',
				width: 200,
				collapsible: true,
//                        collapsed: true
			}, {
				title: 'Console',
				region: 'south',
				margins: '0 5 5 5',
				flex: .3,
				split: true
			}]
	});
	
};

