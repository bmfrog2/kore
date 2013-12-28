var EX = exports;

EX.tb = {};

EX.build = function(){

	console.log('build top menu');  
	
	EX.tb = Ext.create('Ext.toolbar.Toolbar', {
		renderTo : Ext.getBody(),
		items : [ 
			{
				xtype	:'label',
				text	:' KORE ',
			},
			{ xtype: 'tbseparator' },
			{
				xtype	:'button',
				text	:'File',
				menu : 
				[
					{ 
					xtype	:	'button',
					text 	:	'Logout', 
					handler	:	function() { 
							console.log( 'Log out' );
							Ext.Msg.alert('Info', 'I am sorry. It is not not ready this menu' );
						} 
					},
				] //end menu
			},
			{ xtype: 'tbseparator' },
			{
				xtype	:'button',
				text	:'Kernel',
				menu : 
				[
					{ 
						text : 'Config', 
						handler: function() { 
							console.log( 'Kernel Config' );
							
						} 
					},
					{ 
						text : 'Build', 
						handler: function() { 
							console.log( 'Kernel Build' );
						} 
					},
				] //end menu
			},
			{ xtype: 'tbseparator' },
			{
				xtype	:'button',
				text	:'Debug',
				handler: function() { 
					console.log( 'debug window open' ); 
				},
			},
		] //end items
	}); 
	
};

