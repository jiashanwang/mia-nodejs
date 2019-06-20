var express = require("express");
var query = require("./config/mysqlPool");
var app = express();
var bodyParser = require("body-parser");
var getServer = require("./config/promise");
var domainId;
function insertInfo(options, params, domain_id, res) {
    var promise = getServer(options);
    promise.then(function (result) {
        var date = new Date();
        var totalPrice = params.number * params.price;
        var rebate = params.number * params.rebate;
        if (result.length > 0) {
            // 存在相同的号码
            var userid = result[0].userid;
            var username = result[0].username;
            var options = {
                sql: "insert into userinfo (product,username,number,price,totalPrice,datetimes,userid,rebate,domain_id) values (?,?,?,?,?,?,?,?,?)",
                values: [params.product, username, params.number, params.price, totalPrice, date, userid, rebate, domain_id]
            };
            getServer(options).then((result) => {
                res.json({
                    statusCode: 200,
                    msg: "插入数据成功!"
                });
            }, (err) => {
                res.status(404).send();
            })
        } else {
            // 不存在相同的号码
            var options = {
                sql: "insert into users (username,phone,domain_id) values (?,?,?)",
                values: [params.name, params.phone, domain_id]
            };
            getServer(options).then((result) => {
                var userid = result.insertId;
                var options = {
                    sql: "insert into userinfo (product,username,number,price,totalPrice,datetimes,userid,rebate,domain_id) values (?,?,?,?,?,?,?,?,?)",
                    values: [params.product, params.name, params.number, params.price, totalPrice, date, userid, params.rebate, domain_id]
                };
                return getServer(options);
            }, (err) => {
                res.status(404).send(err);
            }).then((result) => {
                res.json({
                    statusCode: 200,
                    msg: "插入数据成功!"
                });
            }, (err) => {
                res.status(404).send();
            })

        }
    }, function (err) {
        res.status(404).send(err);
    })
};


app.use(bodyParser.urlencoded({ extended: true }));
/**
 * 插入用户数据
 */

app.post("/saveInfo", function (req, res, next) {
    var params = req.body;
    var options = {
        sql: "select * from domain where domain = ?",
        values: [params.username]
    };
    // 用promise 解决回调地狱问题
    var promise = getServer(options);
    var domain_id; //新插入的domain_id 是多少
    promise.then(function (result) {
        if (result.length > 0) {
            // 当前域名存在
            var id = result[0].id;
            domain_id = id;
            var options = {
                sql: "select * from users where phone = ? and domain_id = ?",
                values: [params.phone, id]
            };
            insertInfo(options, params, domain_id, res);
        } else {
            // 当前域名不存在
            var options = {
                sql: "insert into domain(domain) values (?)",
                values: [params.username]
            };
            var pro = getServer(options);
            var id;
            pro.then(function (result) {
                id = result.insertId;
                domain_id = id;
                var options = {
                    sql: "select * from users where phone = ? and domain_id = ?",
                    values: [params.phone, id]
                };
                insertInfo(options, params, domain_id, res);
            }, function (err) {
                res.status(404).send(err);
            });
        }
    }, function (err) {
        res.status(404).send(err);
    });
});
/**
 * 
 * 
 * 
 * 根据时间类型进行查询
 */
app.post("/queryByDateType", function (req, res, next) {
    var params = req.body;
    var dateType = params.dateType;
    var wxName = params.wxName;
    var sql;
    var options = {
        sql: "select * from domain where domain = ?",
        values: [params.domainId]
    };
    getServer(options).then((result) => {
        if (result.length == 0) {
            // 没有当前用户的域名
            res.json({
                statusCode: 200,
                data: [],
                msg: "暂无信息"
            });
        } else {
            var domainId = result[0].id;
            if (wxName) {
                // 根据搜索的名字进行模糊匹配
                switch (dateType) {
                    case "1":
                        if (params.status == "amount") {
                            // 按照金额来排序
                            sql = "select sum(totalPrice) AS totalPrice,sum(number) AS number,username,userid,round(sum(number*rebate)) AS totalRebate from userinfo where date_format(datetimes,'%Y-%m-%d') = date_format(now(),'%Y-%m-%d') and username like '%" + wxName + "%' and domain_id=" + domainId + " group by userid ORDER BY totalPrice DESC";
                        } else {
                            //按照消费笔数来排序
                            sql = "select sum(totalPrice) AS totalPrice,sum(number) AS number,username,userid,round(sum(number*rebate)) AS totalRebate from userinfo where date_format(datetimes,'%Y-%m-%d') = date_format(now(),'%Y-%m-%d') and username like '%" + wxName + "%' and domain_id=" + domainId + " group by userid ORDER BY number DESC";
                        };
                        break;
                    case "2":
                        if (params.status == "amount") {
                            sql = "SELECT sum(totalPrice) AS totalPrice,sum(number) AS number,username,userid,round(sum(number*rebate)) AS totalRebate FROM userinfo WHERE YEARWEEK(date_format(datetimes,'%Y-%m-%d')) = YEARWEEK(now()) and username like '%" + wxName + "%' and domain_id=" + domainId + " group by userid ORDER BY totalPrice DESC";
                        } else {
                            sql = "SELECT sum(totalPrice) AS totalPrice,sum(number) AS number,username,userid,round(sum(number*rebate)) AS totalRebate FROM userinfo WHERE YEARWEEK(date_format(datetimes,'%Y-%m-%d')) = YEARWEEK(now()) and username like '%" + wxName + "%' and domain_id=" + domainId + " group by userid ORDER BY number DESC";
                        }
                        break;
                    case "3":
                        if (params.status == "amount") {
                            sql = "SELECT sum(totalPrice) AS totalPrice,sum(number) AS number,username,userid,round(sum(number*rebate)) AS totalRebate FROM userinfo WHERE DATE_FORMAT( datetimes, '%Y%m' ) = DATE_FORMAT( CURDATE( ) , '%Y%m' ) and username like '%" + wxName + "%' and domain_id=" + domainId + " group by userid ORDER BY totalPrice DESC";
                        } else {
                            sql = "SELECT sum(totalPrice) AS totalPrice,sum(number) AS number,username,userid,round(sum(number*rebate)) AS totalRebate FROM userinfo WHERE DATE_FORMAT( datetimes, '%Y%m' ) = DATE_FORMAT( CURDATE( ) , '%Y%m' ) and username like '%" + wxName + "%' and domain_id=" + domainId + " group by userid ORDER BY number DESC";
                        }
                        break;
                    case "4":
                        if (params.status == "amount") {
                            sql = "select sum(totalPrice) AS totalPrice,sum(number) AS number,username,userid,round(sum(number*rebate)) AS totalRebate from userinfo where YEAR(datetimes)=YEAR(NOW()) and username like '%" + wxName + "%' and domain_id=" + domainId + " group by userid ORDER BY totalPrice DESC";
                        } else {
                            sql = "select sum(totalPrice) AS totalPrice,sum(number) AS number,username,userid,round(sum(number*rebate)) AS totalRebate from userinfo where YEAR(datetimes)=YEAR(NOW()) and username like '%" + wxName + "%' and domain_id=" + domainId + " group by userid ORDER BY number DESC";
                        }
                        break;
                };
            } else {
                switch (dateType) {
                    case "1":
                        if (params.status == "amount") {
                            // 按照金额来排序
                            sql = "select sum(totalPrice) AS totalPrice,sum(number) AS number,username,userid,round(sum(number*rebate)) AS totalRebate from userinfo where date_format(datetimes,'%Y-%m-%d') = date_format(now(),'%Y-%m-%d') and domain_id=" + domainId + " group by userid ORDER BY totalPrice DESC";
                        } else {
                            //按照消费笔数来排序
                            sql = "select sum(totalPrice) AS totalPrice,sum(number) AS number,username,userid,round(sum(number*rebate)) AS totalRebate from userinfo where date_format(datetimes,'%Y-%m-%d') = date_format(now(),'%Y-%m-%d') and domain_id=" + domainId + " group by userid ORDER BY number DESC";
                        };
                        break;
                    case "2":
                        if (params.status == "amount") {
                            sql = "SELECT sum(totalPrice) AS totalPrice,sum(number) AS number,username,userid,round(sum(number*rebate)) AS totalRebate FROM userinfo WHERE YEARWEEK(date_format(datetimes,'%Y-%m-%d')) = YEARWEEK(now()) and domain_id=" + domainId + " group by userid ORDER BY totalPrice DESC";
                        } else {
                            sql = "SELECT sum(totalPrice) AS totalPrice,sum(number) AS number,username,userid,round(sum(number*rebate)) AS totalRebate FROM userinfo WHERE YEARWEEK(date_format(datetimes,'%Y-%m-%d')) = YEARWEEK(now()) and domain_id=" + domainId + " group by userid ORDER BY number DESC";
                        }
                        break;
                    case "3":
                        if (params.status == "amount") {
                            sql = "SELECT sum(totalPrice) AS totalPrice,sum(number) AS number,username,userid,round(sum(number*rebate)) AS totalRebate FROM userinfo WHERE DATE_FORMAT( datetimes, '%Y%m' ) = DATE_FORMAT( CURDATE( ) , '%Y%m' ) and domain_id=" + domainId + " group by userid ORDER BY totalPrice DESC";
                        } else {
                            sql = "SELECT sum(totalPrice) AS totalPrice,sum(number) AS number,username,userid,round(sum(number*rebate)) AS totalRebate FROM userinfo WHERE DATE_FORMAT( datetimes, '%Y%m' ) = DATE_FORMAT( CURDATE( ) , '%Y%m' ) and domain_id=" + domainId + " group by userid ORDER BY number DESC";
                        }
                        break;
                    case "4":
                        if (params.status == "amount") {
                            sql = "select sum(totalPrice) AS totalPrice,sum(number) AS number,username,userid,round(sum(number*rebate)) AS totalRebate from userinfo where YEAR(datetimes)=YEAR(NOW()) and domain_id=" + domainId + " group by userid ORDER BY totalPrice DESC";
                        } else {
                            sql = "select sum(totalPrice) AS totalPrice,sum(number) AS number,username,userid,round(sum(number*rebate)) AS totalRebate from userinfo where YEAR(datetimes)=YEAR(NOW()) and domain_id=" + domainId + " group by userid ORDER BY number DESC";
                        }
                        break;
                };
            }

            var options = {
                sql: sql
            };
            getServer(options).then((result) => {
                res.json({
                    statusCode: 200,
                    data: result
                });
            }, (err) => {
                res.status(404).send(err)
            })
        }

    }, (err) => {
        res.status(404).send(err);
    })
});
/**
 * 根据userid 来查询当前用户下的所有数据
 */
app.post("/getByPhone", function (req, res) {
    var params = req.body;
    console.log("getByPhone 的接收参数为：");
    console.log(params);
    var options = {
        sql: "select product,number,price,totalPrice,date_format(datetimes,'%m-%d') as datetimes,rebate from userInfo where userid = ?",
        values: [params.userid]
    };
    query(options, function (err, result, fields) {
        console.log("getByPhone 返回值为：");
        console.log(err);
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
app.post("/getAll", function (req, res) {
    var params = req.body;
    var options = {
        sql: "select * from domain where domain = ?",
        values: [params.domainId]
    };
    var promise = getServer(options);
    promise.then(function (result) {
        if (result.length > 0) {
            var id = result[0].id;
            var options = {
                sql: "select sum(number) as totalNumber,sum(totalPrice) as totalPrice ,COUNT(DISTINCT username) as count from userinfo where domain_id = ?",
                values: [id]
            };
            var promise1 = getServer(options);
            return promise1;
        } else {
            res.json({
                statusCode: 200,
                data: {
                    userCount: 0,
                    totalPrice: 0,
                    totalNumber: 0
                }
            });
        }
    }, function (err) {
        res.status(404).send(err)
    }).then(function (result) {
        res.json({
            statusCode: 200,
            data: {
                userCount: result[0].count || 0,
                totalPrice: result[0].totalPrice || 0,
                totalNumber: result[0].totalNumber || 0
            }
        });
    }, function (err) { res.status(404).send(err) })
})
app.listen(3011, function () {
    console.log("mia 小程序 3000 端口服务已经启动");
})
