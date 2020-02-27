var db = require('./db');

module.exports ={
	getById: function(id, callback){
		var sql = "select * from login where id=?";
		db.getResult(sql, [id], function(result){

			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	getByUname: function(uname, callback){
		var sql = "select * from login where username=?";
		db.getResult(sql, [uname], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	validate: function(user, callback){
		var sql = "select * from login where username=? and password=?";
		db.getResult(sql, [user.uname,user.password], function(result){
			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getAll:function(callback){
		var sql = "select * from login";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	insert: function(user, callback){
		var sql = "insert into login values (?,?,?,?)";
		db.execute(sql, [null,user.uname,user.password,user.type], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(id, callback){
		var sql = "delete from login where id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update: function(userUpdate, callback){
		var sql = "update login set username=?, password=? where id=?";
		db.execute(sql,[userUpdate.uname,userUpdate.password,userUpdate.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	searchUser:function(data,callback){
		var sql = "select * from login where username like '%"+data+"%'";
		db.getResult(sql, null, function(results){
				callback(results);
			});
		}
}