// Make sure to load the environment variable first
require("./dotenv");

const express = require("express");
const bodyParser = require("body-parser");
const crossDomain = require("./middleware/cross-domain");
const userAgent = require("./middleware/user-agent");
const log = require("./middleware/log");
const routers = require("./routers");
const log4js = require("./log4js");
// const mysql = require("mysql");

const logger = log4js.getLogger(process.env.LOG_CATEGORY);

const app = express();
app.use(express.static("public"));
if (process.env.NODE_ENV !== "production") {
  app.use(express.static("./"));
}
// 配置CORS中间件
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});
app.use(bodyParser.json());

app.use(log);

app.use(userAgent);

app.use(crossDomain);

app.use(routers);

// // 数据库连接
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Djx0905#',
//   database: 'eyepetizer'
// })

// connection.connect((err) => {
//   if (err) {
//     console.error('ERROR CONNECT MYSQL DATABASE');
//     return;
//   }else{
//     console.log('success connect mysql database')
//   }
// })


// Error handling
app.use(function (err, req, res, next) {
  logger.error(err.stack);
  res.status(500).send({
    code: "-1",
    msg: err.stack
  });
});
/* eslint-disable no-console */
app.listen(3011, () => {
  console.log("Your app is running");
});
