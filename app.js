
/**
 * Module dependencies.
 */

global.root_path = __dirname;

var express 		= require('express')
  , http 			= require('http')
  , path 			= require('path')
  , socketio		= require('socket.io')
  
  // routers
  , home			= require('./routes/index')
  , source_explore  = require('./routes/source_explore')
  ;

  
app 		= express();

var server 	= http.createServer(app);
 
app.set('port', process.env.PORT || 3000);

app.set('views', path.join(global.root_path, 'views'));
app.set('view engine', 'html');
// app.enable('view cache');

app.set('layout', 'layout');
//app.set('partials', {head: "head"}); 
app.set('partials', {}); 
app.engine( 'html', require('hogan-express') );
		  
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
//	app.use(express.bodyParser());
app.use(express.urlencoded());
app.use(express.methodOverride());
//	app.use(express.cookieParser('your secret here'));
//	app.use(express.session({ secret: 'super-duper-secret-secret' }));
app.use(app.router);
// app.use(require('less-middleware')({ src: path.join(global.root_path, 'public') }));
app.use(express.static(path.join(global.root_path, 'public')));
		
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

source_explore.init();
 
server.listen(app.get('port'), function(){
  	console.log("Express server listening on port " + app.get('port'));
  
});

var io 		= socketio.listen( server, { log: false });

app.get('/', home.index);

io.of('/source_explore').on( 'connection', source_explore.on_connection ); 

