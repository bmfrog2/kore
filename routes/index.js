var EX = exports;

EX.index = function(req, res){
  res.render('index', { title: 'Express' });
};

EX.on_connection = function(socket){
	console.log('index connect');

 	socket.on('disconnect', function (socket){
 		console.log("index disconnect" );
 	});
};

  