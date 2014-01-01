var form_top_menu 	= require('./form_top_menu');
var source_explore  = require('./source_explore');
var form_work 		= require('./form_work');


console.log('start main.js by browerfy3');

Ext.onReady(function () {
		
	console.log('CALL Ext.onReady');
	
	form_top_menu.build();
	source_explore.build();
	
	form_work.build( 	form_top_menu.tb,
						source_explore.tree
	                 );
					 
	source_explore.init_load();
});

