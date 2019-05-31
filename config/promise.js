var query = require("./mysqlPool");
/**
 * 创建一个promise
 * @param {*} options  mysql 语句块
 */
function getServer(options) {
    var promise = new Promise((res, rej) => {
        query(options, function (err, results, fields) {
            if (err) {
                rej(err);
            } else {
                res(results);
            };
        });
    });
    console.log(promise);
    return promise;
};
module.exports = getServer;