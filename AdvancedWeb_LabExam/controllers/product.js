var express 	= require('express');
var router 		= express.Router();
var productModel= require.main.require('./models/product-model');


router.get('/', function(req, res){
	console.log('Add Product page requested!');
	res.render('product/addProduct');
});

router.get('/product', function(req, res){

	productModel.getAll(function(results){
		if(results.length > 0){
			res.render('product/product', {userlist: results});
		}else{
			res.send('invalid username/password');
		}
	});
});

router.get('/delete/:id', function(req, res){
 	var id = req.params.id;
	productModel.delete(id,function(result){
	if(result){
		res.redirect('../product');
	}else{
		res.send('invalid username/password');
	}
});
});

router.get('/edit/:id', function(req, res){
	var id=req.params.id;
	productModel.getById(id,function(results){
		if(results!=null){
			res.render('product/edit', {user: results});
		}else{
			res.send('invalid');
		}
	});
});

router.post('/edit/:id', function(req, res){
	var userUpdate={
		id:req.params.id,
		name:req.body.name,
		quantity:req.body.quantity,
		price:req.body.price
	};
	console.log(userUpdate);
	productModel.update(userUpdate,function(results){
		if(results){
			res.redirect('../product');
		}else{
			res.send('invalid');
		}
	});
});

router.post('/', function(req, res){
		
		var info ={
			name: req.body.name,
			quantity: req.body.quantity,			
			price: req.body.price
		};
		productModel.insert(info, function(status){
			if(status){
				res.redirect('home/emp');
			}else{
				res.redirect('/product');
			}
		});
});

module.exports = router;

