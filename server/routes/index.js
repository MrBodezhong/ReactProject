const express = require('express');
const router = express.Router();
var search_db = require('../../db/db_concat.js');
const app=express();
//设置跨域访问
router.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

/* GET home page. */
router.get('/websites', function (req, res, next) {
  search_db(req.route.path,req.query).then(res_ => {
    let result = JSON.stringify(res_);
    res.send(result);
  }).catch(err=>{
    res.send(err);
  })
});


/* POST home page. */
router.post('/websites', function (req, res, next) {
  search_db(req.Url.pathname,req.query).then(res_ => {
    let result = JSON.stringify(res_);
    res.send(result);
  }).catch(err=>{
    res.send(err);
  })

});

module.exports = router;
