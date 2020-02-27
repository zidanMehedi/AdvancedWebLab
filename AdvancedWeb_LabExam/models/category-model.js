var db = require('./db');

module.exports ={
	getById: function(id, callback){
		var sql = "select * from category where cat_id=?";
		db.getResult(sql, [id], function(result){

			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	getByUname: function(uname, callback){
		var sql = "select * from category where cat_name=?";
		db.getResult(sql, [uname], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	/*validate: function(user, callback){
		var sql = "select * from product where username=? and password=?";
		db.getResult(sql, [user.uname,user.password], function(result){
			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},*/
	getAll:function(callback){
		var sql = "select * from category";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	insert: function(user, callback){
		var sql = "insert into category values (?,?)";
		db.execute(sql, [null,user.catname], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(id, callback){
		var sql = "delete from category where cat_id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update: function(userUpdate, callback){
		var sql = "update category set cat_name=? where cat_id=?";
		db.execute(sql,[userUpdate.catname,userUpdate.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}