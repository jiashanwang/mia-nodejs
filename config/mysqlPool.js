var config = require("./mysqlConf");
var mysql = require("mysql");
var pool = mysql.createPool({
    host:config.HOST,
    port:config.PORT,
    user:config.USER,
    password:config.PASSWORD,
    database:config.DATABASE
});

// 创建连接池
 var query = function(options,callback){
     // 从连接池里面获取一个连接
     pool.getConnection(function (err,connection){
         if(err){
             callback(err,null,null);
         }else {
             connection.query(options,function (err,results,fields){
                    // 从连接池里面获取到数据后就释放连接
                    callback(err,results,fields);
                    connection.release();
                   
             });
         };
     });
 };
 module.exports = query;
