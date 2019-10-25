
// const router = express.Router();
var search_db = require('../../db/db_concat.js');
const express = require('express')
  , cors = require('cors')
  , app = express();

app.use(cors());


/* GET home page. */
app.get('/websites', function (req, res, next) {
  search_db(req.route.path, req.query).then(res_ => {
    let result = JSON.stringify(res_);
    res.send(result);
  }).catch(err => {
    res.send(err);
  })
});
app.get('/area_table', function (req, res, next) {
  search_db(req.route.path, req.query).then(res_ => {
    let result = JSON.stringify(res_);
    res.send(result);
  }).catch(err => {
    res.send(err);
  })
});

/* POST home page. */
app.post('/websites', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  search_db(req.route.path, req.body).then(res_ => {
    let result = JSON.stringify(res_);
    res.send(result);
  }).catch(err => {
    res.send(err);
  })

});

module.exports = app;
