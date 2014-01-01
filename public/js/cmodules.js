(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var EX = exports;

EX.tb = {};

EX.build = function(){

	console.log('build top menu');  
	
	EX.tb = Ext.create('Ext.toolbar.Toolbar', {
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


},{}],2:[function(require,module,exports){
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


},{}],3:[function(require,module,exports){
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


},{"./form_top_menu":1,"./form_work":2,"./source_explore":4}],4:[function(require,module,exports){
var EX = exports;

EX.store = {};
EX.tree  = {};
EX.node_count = 1;

EX.socket = io.connect( document.URL + 'source_explore' );

EX.build = function(){

    console.log( 'document url = [' + document.URL + ']' );
	console.log( 'window.location.pathname = [' + window.location.pathname + ']' );

	EX.store = Ext.create('Ext.data.TreeStore', {
		root: {
		}
	});

	EX.tree = Ext.create('Ext.tree.Panel', {
		store		: EX.store,
		rootVisible	: false,
		anchor 		: '100% 100%',
		listeners: {
			itemclick : function( node, record, item, index, e, eOpts ) {
				console.log( '>> itemclick' );
			},
			
			beforeitemexpand : function( node, eOpts ) {
				console.log( '>> beforeitemexpand' );
			},
			itemexpand : function( node, eOpts ) {
				console.log( '>> itemexpand' );
				var all_path = node.getPath('text');
				var root_path = all_path.replace(/^\/Root\//, "/");
				console.log( all_path  );
				console.log( root_path );

				console.log( 'call server expand dir' );
				EX.socket.emit('expand_dir', { path : root_path } );
			},
			itemcollapse : function( node, eOpts ) {
				console.log( '>> itemcollapse' );
				var all_path = node.getPath('text');
				console.log( all_path  );
//				node.removeAll(true);
			},
			
			afteritemexpand  : function( node, index, item, eOpts ) {
				console.log( '>> afteritemexpand' );
			},
			
			select    : function( node, record, index, eOpts ) {
				console.log( '>> select' );
			},		
			
			beforeitemdblclick    : function( node, record, item, index, e, eOpts ) {
				console.log( '>> beforeitemdblclick' );
				if( !record.isLeaf() && !record.isExpanded()) 
				{
					console.log( "ok expandable..." );
					//var selected_node = EX.tree.getSelectionModel().getSelection()[0];
					record.removeAll();
					record.expand();
				}
			},
			
			itemdblclick    : function( node, record, item, index, e, eOpts ) {
				console.log( '>> itemdblclick' );
			}
		}

//		tools : [
//			{  type: 'plus', handler: function(event, target, owner, tool) {
//				if( EX.tree.getSelectionModel().hasSelection() )
//				{
//					var selected_node = EX.tree.getSelectionModel().getSelection();
//					 
//					selected_node[0].set('leaf', false);
//                    selected_node[0].appendChild(
//								{
//                                    leaf: true,
//                                    text: 'node(' + EX.node_count + ')',
//                                });            
//					selected_node[0].expand();
//					EX.node_count = EX.node_count + 1;
//					EX.tree.getView().refresh();
//				}
//			}},		
//			{  type: 'minus', handler: function(event, target, owner, tool) {
//				if( EX.tree.getSelectionModel().hasSelection() )
//				{
//					var selected_node 	= EX.tree.getSelectionModel().getSelection();
//					var parent_node 	= selected_node[0].parentNode;
//
//                    selected_node[0].remove(true);
//
//                    if (!parent_node.hasChildNodes()) {
//                        parent_node.set('leaf', true);
//                    }
//					
//					EX.tree.getView().refresh();
//					 
//				}
//			}} 
//		]
		
	});	
};

EX.init_load = function(){

	EX.socket.emit('init_load', {});
	
};

EX.socket.on('init_load', function (data) {
    
	console.log( '>> call init_load' );
	console.log( data );
	
	var root_node = EX.tree.getRootNode();

	for( var i = 0; i < data.dirs.length; i++ ){
		var node = root_node.appendChild(
					{
						leaf: true,
						text: data.dirs[i],
					});            
		node.set('leaf', false);
	
	}

//	if( data.dirs.length > 0 ) {
//		EX.tree.selectPath( '/Root/'+data.dirs[0],'text' );
//	}
	
//	var selected_node = EX.tree.getSelectionModel().getSelection();

//	root_node.expand();
//	EX.tree.getView().refresh();
	
//	EX.node_count = EX.node_count + 1;
	
	
});


EX.socket.on('expand_dir', function (data) {
	
	console.log( '>> call expand_dir' );
	console.log( data );
	
	EX.tree.selectPath( '/Root' + data.path ,'text' );
	var selected_node = EX.tree.getSelectionModel().getSelection()[0];
	
//	selected_node.removeAll(true);
	
	for( var i = 0; i < data.dirs.length; i++ ){
		var node = selected_node.appendChild(
					{
						leaf: data.dirs[i].type !== 'dir',
						text: data.dirs[i].name,
					});
	}

});


},{}]},{},[3])