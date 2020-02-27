var express 	= require('express');
var router 		= express.Router();
var userModel   = require.main.require('./models/user-model');
var empModel	= require.main.require('./models/emp-model');


router.get('*',function(req,res,next){
	if(req.cookies['username']!=null){
		next();
	}else{
		res.redirect('/login');
	}
});

router.get('/', function(req, res){
		
		userModel.getByUname(req.cookies['username'], function(result){
		res.render('home/index', {user: result});
	});
});

router.get('/emp', function(req, res){
		
		empModel.getByUname(req.cookies['username'], function(result){
		res.render('home/emp', {user: result});
	});
});

router.get('/alluser', function(req, res){

	userModel.getAll(function(results){
		if(results.length > 0){
			res.render('home/alluser', {userlist: results});
		}else{
			res.send('invalid username/password');
		}
	});
});

router.get('/delete/:id', function(req, res){
 	var id = req.params.id;
	userModel.delete(id,function(result){
	if(result){
		res.redirect('../alluser');
	}else{
		res.send('invalid username/password');
	}
});
});

router.get('/edit/:id', function(req, res){
	var id=req.params.id;
	userModel.getById(id,function(results){
		if(results!=null){
			res.render('home/edit', {user: results});
		}else{
			res.send('invalid username/password');
		}
	});
});

router.post('/edit/:id', function(req, res){
	var userUpdate={
		id:req.params.id,
		name:req.body.name,
		contact:req.body.contact
	};
	console.log(userUpdate);
	empModel.update(userUpdate,function(results){
		if(results){
			res.redirect('../alluser');
		}else{
			res.send('invalid username/password');
		}
	});
});

module.exports = router;

