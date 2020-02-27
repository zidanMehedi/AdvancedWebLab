var express 	= require('express');
var router 		= express.Router();
var productModel= require.main.require('./models/product-model');
var catModel= require.main.require('./models/category-model');
var subcatModel= require.main.require('./models/subcategory-model');

router.get('*',function(req,res,next){
	if(req.cookies['username']!=null){
		next();
	}else{
		res.redirect('/login');
	}
});

router.get('/view/:id', function(req, res){
	productModel.getById(req.params.id,function(status){
			if(status!=null){
				res.render('product/view',{user:status});
			}else{
				res.redirect('/home/emp');
			}
		});
});

router.get('/buy/:id', function(req, res){
	productModel.getById(req.params.id,function(status){
			if(status!=null){
				res.render('product/buy',{user:status});
			}else{
				res.redirect('/home/emp');
			}
		});
});
router.post('/buy/:id', function(req, res){
	var newQty=parseInt(req.body.aquantity)-parseInt(req.body.quantity);
	var data ={
		id:req.body.name,
		quantity:newQty
	}
	console.log(data);
	productModel.updateQty(data,function(status){
			if(status){
				res.redirect('/home/emp');
			}else{
				res.redirect('/product/view');
			}
		});
});
router.get('/', function(req, res){
	subcatModel.getAll(function(status){
			if(status.length>0){
				res.render('product/addProduct',{item:status});
			}else{
				res.redirect('/product/addProduct');
			}
		});
});

router.get('/category', function(req, res){
	console.log('Add Product page requested!');
	res.render('product/addCategory');
});

router.post('/category', function(req, res){
	var info ={
			catname: req.body.catname,
		};
		catModel.insert(info, function(status){
			if(status){
				res.redirect('/home');
			}else{
				res.redirect('/product/addCategory');
			}
		});
	//res.render('product/addCategory');
});

router.get('/subcategory', function(req, res){
		catModel.getAll(function(status){
			if(status.length>0){
				res.render('product/addSubCategory',{item:status});
			}else{
				res.redirect('/product/addSubCategory');
			}
		});	
});

router.post('/subcategory', function(req, res){
	var info ={
			category: req.body.category,
			subcategoryName: req.body.subcatname
		};
		subcatModel.insert(info, function(status){
			if(status){
				res.redirect('/home');
			}else{
				res.redirect('/product/addSubCategory');
			}
		});
	//res.render('product/addCategory');
});

router.post('/category', function(req, res){
	var info ={
			catname: req.body.catname,
		};
		catModel.insert(info, function(status){
			if(status){
				res.redirect('/home');
			}else{
				res.redirect('/product/addCategory');
			}
		});
	//res.render('product/addCategory');
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

router.get('/emproduct', function(req, res){

	productModel.getAll(function(results){
		if(results.length > 0){
			res.render('product/emproduct', {userlist: results});
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
			subcategory: req.body.subcategory,
			review:req.body.review,
			quantity: req.body.quantity,			
			price: req.body.price
		};
		productModel.insert(info, function(status){
			if(status){
				res.redirect('/home');
			}else{
				res.redirect('/product');
			}
		});
});

module.exports = router;

