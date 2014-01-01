var EX = exports;

var path	= require( 'path' );
var fs		= require( 'fs-extra' );

EX.top_path = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/kernel/';

EX.init = function( top_path ){

	console.log('source_explore init');
	
	EX.top_path =  top_path || EX.top_path;
	
	console.log('source_explore');
	console.log('---------------');
	console.log('top path = [' + EX.top_path + ']' );
	
};

EX.init_load = function( data ){

	var socket = this.namespace.sockets[this.id];
//	var path   = this.namespace.name;

	var dirs = fs.readdirSync( EX.top_path );
	var data = {};
	data.dirs = [];
	
	dirs.map( function(v) {
		if( fs.lstatSync( EX.top_path + v ).isDirectory() )
		{
			data.dirs.push( v );
		}
	});
	
	console.log( data );
		
    socket.emit('init_load', data );
	
};

EX.expand_dir = function( req_data ){

	var socket = this.namespace.sockets[this.id];
//	var path   = this.namespace.name;
	
	var top_path = path.normalize( EX.top_path + req_data.path ) + '/';
//	console.log( req_data.path );
	console.log( top_path );
	
	var dirs = fs.readdirSync( top_path ).sort();
	
//	console.log( dirs );
	
	var res_data 	= {};
	res_data.path  	= req_data.path;
	res_data.dirs 	= [];
	
	dirs.map( function(v) {
		if( fs.lstatSync( top_path + v ).isDirectory() )
		{
			res_data.dirs.push( { type : "dir", 	name : v } );
		}
	});
	dirs.map( function(v) {
		if( !fs.lstatSync( top_path + v ).isDirectory() )
		{
			res_data.dirs.push( { type : "file", 	name : v } );
		}
	});
	
//	data = {
//      path : "/asdf/asfd/asdf/asdf/",
//		dirs : 
//		[
//			{ type : "file", 	name : "file.a" },
//			{ type : "file", 	name : "file.b" },
//			{ type : "dir", 	name : "dir.a" },
//		]
//	};
	
//	console.log( res_data );
		
    socket.emit('expand_dir', res_data );
};

EX.on_connection = function(socket){
	console.log('source_explore connect');

 	socket.on( 'init_load', 	EX.init_load );
 	socket.on( 'expand_dir', 	EX.expand_dir );
 	
 	socket.on('disconnect', function (socket){
 		console.log("source_explore disconnect" );
 	});
	
};

  