var EX = exports;

EX.vp = {};

EX.build = function( main_menu, source_explore ){

	console.log('build work form');  
	
	EX.vp = Ext.create('Ext.container.Viewport', {
			layout: 'border',
			items: [{
				region: 'north',
				margins: 5,
				xtype: 'container',
				items : [ 
					main_menu,
				],
			}, {
				title: 'Source explore',
				region: 'west',
				margins: '0 5 0 5',
				flex: .3,
				collapsible: true,
				split: true,
				titleCollapse: true,
				layout : 'anchor',
				items : [
					source_explore,
				],
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

