var express = require("express");
var query = require("./config/mysqlPool");
var app = express();
var bodyParser = require("body-parser");
var getServer = require("./config/promise");



app.use(bodyParser.urlencoded({ extended: true }));
/**
 * 插入用户数据
 */
app.post("/saveInfo", function (req, res, next) {
    var params = req.body;
    console.log(params);
    var options = {
        sql: "select * from users where phone = ?",
        values: [params.phone]
    };
    query(options, function (err, result, fields) {
        console.log(err);
        console.log(result);
        if (err) {
            res.status(404);
            res.send(err);
        } else {
            var date = new Date();
            var totalPrice = params.number * params.price;
            var rebate = params.number * params.rebate;
            if (result.length > 0) {
                // 已经存在该用户的信息 直接根据userid 在用户表中插入数据
                var userid = result[0].userid;
                var username = result[0].username;
                var options = {
                    sql: "insert into userinfo (product,username,number,price,totalPrice,datetimes,userid,rebate) values (?,?,?,?,?,?,?,?)",
                    values: [params.product, username, params.number, params.price, totalPrice, date, userid,rebate]
                };
                query(options, function (err, result, fields) {
                    if (err) {
                        res.status(404);
                        res.send(err);
                    } else {
                        res.json({
                            statusCode: 200,
                            msg: "插入数据成功!"
                        });
                    }
                })
            } else {
                // 不存在该用户，则直接插入用户信息
                var options = {
                    sql: "insert into users (username,phone) values (?,?)",
                    values: [params.name, params.phone]
                };
                query(options, function (err, result, fields) {
                    if (err) {
                        res.status(404);
                        res.send(err);
                    } else {
                        // 插入用户信息成功
                        var userid = result.insertId;
                        var options = {
                            sql: "insert into userinfo (product,username,number,price,totalPrice,datetimes,userid) values (?,?,?,?,?,?)",
                            values: [params.product, username, params.number, params.price, totalPrice, date, userid]
                        };
                        query(options, function (err, result, fields) {
                            if (err) {
                                res.status(404);
                                res.send(err);
                            } else {
                                res.json({
                                    statusCode: 200,
                                    msg: "插入数据成功!"
                                });
                            }
                        })
                    }
                })
            }
        }
    })
});
app.post("/queryByDateType", function (req, res, next) {
    var params = req.body;
    var dateType = params.dateType;
    var sql;
    switch (dateType) {
        case "1":
            if (params.status == "amount") {
                // 按照金额来排序
                sql = "select sum(totalPrice) AS totalPrice,sum(number) AS number,username,userid,sum(rebate) AS rebate from userinfo where date_format(datetimes,'%Y-%m-%d') = date_format(now(),'%Y-%m-%d') group by userid ORDER BY totalPrice DESC";
            } else {
                //按照消费笔数来排序
                sql = "select sum(totalPrice) AS totalPrice,sum(number) AS number,username,userid,sum(rebate) AS rebate from userinfo where date_format(datetimes,'%Y-%m-%d') = date_format(now(),'%Y-%m-%d') group by userid ORDER BY number DESC";
            };
            break;
        case "2":
            if (params.status == "amount") {
                sql = "SELECT sum(totalPrice) AS totalPrice,sum(number) AS number,username,userid,sum(rebate) AS rebate FROM userinfo WHERE YEARWEEK(date_format(datetimes,'%Y-%m-%d')) = YEARWEEK(now()) group by userid ORDER BY totalPrice DESC";
            } else {
                sql = "SELECT sum(totalPrice) AS totalPrice,sum(number) AS number,username,userid,sum(rebate) AS rebate FROM userinfo WHERE YEARWEEK(date_format(datetimes,'%Y-%m-%d')) = YEARWEEK(now()) group by userid ORDER BY number DESC";
            }
            break;
        case "3":
            if (params.status == "amount") {
                sql = "SELECT sum(totalPrice) AS totalPrice,sum(number) AS number,username,userid,sum(rebate) AS rebate FROM userInfo WHERE DATE_FORMAT( datetimes, '%Y%m' ) = DATE_FORMAT( CURDATE( ) , '%Y%m' ) group by userid ORDER BY totalPrice DESC";
            } else {
                sql = "SELECT sum(totalPrice) AS totalPrice,sum(number) AS number,username,userid,sum(rebate) AS rebate FROM userInfo WHERE DATE_FORMAT( datetimes, '%Y%m' ) = DATE_FORMAT( CURDATE( ) , '%Y%m' ) group by userid ORDER BY number DESC";
            }
            break;
        case "4":
            if (params.status == "amount") {
                sql = "select sum(totalPrice) AS totalPrice,sum(number) AS number,username,userid,sum(rebate) AS rebate from userInfo where YEAR(create_date)=YEAR(NOW()) group by userid ORDER BY totalPrice DESC";
            } else {
                sql = "select sum(totalPrice) AS totalPrice,sum(number) AS number,username,userid,sum(rebate) AS rebate from userInfo where YEAR(create_date)=YEAR(NOW()) group by userid ORDER BY number DESC";
            }
            break;
    };
    var options = {
        sql: sql
    };
    query(options, function (err, results, fields) {
        console.log("所有用户信息如下所示：");
        console.log(err);
        console.log(results);
        if (err) {
            res.json({
                statusCode: 404,
                msg: err
            });
        } else {
            res.json({
                statusCode: 200,
                data: results
            });
        }
    }
    )
});
/**
 * 根据userid 来查询当前用户下的所有数据
 */
app.post("/getByPhone", function (req, res) {
    var params = req.body;
    console.log(params);
    var options = {
        sql: "select product,number,price,totalPrice,date_format(datetimes,'%m-%d') as datetimes,rebate from userInfo where userid = ?",
        values: [params.userid]
    };
    query(options, function (err, result, fields) {
        console.log(result);
        if (!err) {
            res.json({
                statusCode: 200,
                data: result
            });
        } else {
            res.json({
                statusCode: 404,
                msg: "出错啦!"
            });
        }
    })
})
app.get("/getAll",function (req,res){
    var options = {
        sql:"select sum(number) as totalNumber,sum(totalPrice) as totalPrice ,COUNT(DISTINCT username) as count from userinfo ; "
    };
    var userTotal ;
    query(options, function (err, result, fields) {
        console.log(result);
        if (err) {
            res.json({
                statusCode: 404,
                msg: "出错啦!"
            });
        } else {
         console.log(result);
         res.json({
            statusCode:200,
            data:{
                userCount:result[0].count,
                totalPrice:result[0].totalPrice,
                totalNumber:result[0].totalNumber
            }
         });
        }
    })
})
app.listen(3011, function () {
    console.log("mia 小程序 3000 端口服务已经启动");
})
