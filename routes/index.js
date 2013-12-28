
/*
 * GET home page.
 */

exports.index = function(req, res){
	console.log( 'TEST' );
  res.render('index', { title: 'Express' });
};
