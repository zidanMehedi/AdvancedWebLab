var express 	= require('express');
var router 		= express.Router();
var userModel	= require.main.require('./models/user-model');
var empModel	= require.main.require('./models/emp-model');
const{check, validationResult}=require('express-validator/check');

router.get('/',[check('uname','Username is Empty').isEmpty(),check('password','Password is Empty').isEmpty()], function(req, res){
	console.log('login page requested!');
	var errors = validationResult(req);
	console.log(errors.mapped());
	res.render('login/index',{error: errors.mapped()});
});

router.post('/',[check('uname','Username is Empty').not().isEmpty(),check('password','Password is Empty').not().isEmpty()], function(req, res){
		
		var errors = validationResult(req);
		console.log(errors.mapped());
		var user ={
			uname: req.body.uname,
			password: req.body.password,
			//postError: errors.mapped()
		};

		userModel.validate(user, function(status)
		{
			if(status)
			{
				userModel.getByUname(req.body.uname, function(results)
				{
					if(results.type=='Customer')
					{
							res.cookie('username', req.body.uname);
							res.redirect('/home/emp');
					}
					else if(results.type=='Admin')
					{
						res.cookie('username', req.body.uname);
						res.redirect('/home');
					}
				});
			}
			else
			{
				res.render('login/index',{error: errors.mapped()});
			}
		});
});

module.exports = router;

