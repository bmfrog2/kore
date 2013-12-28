var form_top_menu 	= require('./form_top_menu')
var form_work 		= require('./form_work')

console.log('start main.js by browerfy3');

Ext.onReady(function () {
		
	console.log('CALL Ext.onReady');
	
	form_top_menu.build();
	form_work.build();
	
	
});

