var express 	= require('express');
var router 		= express.Router();
var userModel	= require.main.require('./models/user-model');
var empModel	= require.main.require('./models/emp-model');

router.get('/', function(req, res){
	console.log('Register page requested!');
	res.render('register/index');
});

router.post('/', function(req, res){
		
		var info ={
			name: req.body.name,
			contact: req.body.contact,			
			uname: req.body.uname,
			password: req.body.password,
			type:'employee'
		};
		var user ={			
			uname: req.body.uname,
			password: req.body.password,
			type:'employee'
		};

		empModel.insert(info, function(status){
			if(status){
					userModel.insert(user, function(status){
					if(status){
						res.redirect('/login');
					}else{
						res.redirect('/reg');
					}
				});
				/*res.cookie('username', req.body.uname);
				res.redirect('/home');*/
			}else{
				res.redirect('/reg');
			}
		});
});

module.exports = router;

