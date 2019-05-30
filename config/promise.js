var query = require("./mysqlPool");
/**
 * 创建一个promise
 * @param {*} options  mysql 语句块
 */
function getServer(options) {
    var promise = new Promise((resolve, reject) => {
        query(options, function (err, results, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(err,results,fields);
            };
        });
    });
    console.log(promise);
    return promise;
};
module.exports = getServer;