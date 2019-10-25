const mysql = require('mysql');
const search_params = require('./db_search');
function handleError(err) {
  if (err) {
    // 如果是连接断开，自动重新连接
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      connect();
    } else {
      console.error(err.stack || err);
    }
  }
}

// 连接数据库
function connect() {
  db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'bodezhong/415',
    database: 'websites'
  });;
  db.connect(handleError);
  db.on('error', handleError);
}

var db;
connect();

//  'SELECT * FROM websites';



const search_db = function (url_ = '', parmas_ = {}) {
  return new Promise((resolve, reject) => {
    let sql;
    try {
      sql = search_params[url_](url_, parmas_);
      console.log(sql, 'sql')
      if (sql === false) {
        reject('未定义接口查询条件')
      }
      //查
      db.query(sql, function (err, result) {
        if (err) {
          console.log(err.message, 'error')
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