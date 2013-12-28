(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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


},{}],2:[function(require,module,exports){
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


},{}],3:[function(require,module,exports){
var form_top_menu 	= require('./form_top_menu')
var form_work 		= require('./form_work')

console.log('start main.js by browerfy3');

Ext.onReady(function () {
		
	console.log('CALL Ext.onReady');
	
	form_top_menu.build();
	form_work.build();
	
	
});


},{"./form_top_menu":1,"./form_work":2}]},{},[3])