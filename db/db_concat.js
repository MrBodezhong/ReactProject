const mysql = require('mysql');
const search_params = require('./db_search');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'bodezhong/415',
  database: 'websites'
});

connection.connect();
//  'SELECT * FROM websites';



const search_db = function (url_ = '', parmas_ = {}) {
  return new Promise((resolve, reject) => {
    let sql;
    try {
      sql = search_params[url_](url_, parmas_);
      //查
      connection.query(sql, function (err, result) {
        if (err) {
          reject('[SELECT ERROR] - ', err.message)
          return;
        }
        resolve(result)
      });
    } catch (error) {
      reject('搜索条件有误')
    }

  })

}
module.exports = search_db