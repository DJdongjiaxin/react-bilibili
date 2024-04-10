const express = require('express');
const router = express.Router();
const dbConfig = require('../dbconfig');
const multer = require('multer')
// 配置 multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
/**
 * 用户登录接口
 */
router.get('/user/login', async (req, res, next) => {
  let { number, password } = req.query;
  var sql1 = "select * from user where number=?";
  var sqlArr1 = [number];
  let code = 0;
  let msg = '登录成功';
  var callBack1 = (err, data) => {
    if (!data || data.length <= 0) {
      code = 10001;
      msg = '该手机号尚未注册'
      res.send({
        'code': code,
        'msg': msg,
        'data': data
      })
    } else {
      var sql2 = "select * from user where number=? and password=?";
      var sqlArr2 = [number, password];
      var callBack2 = (err, data) => {
        if (!data || data.length <= 0) {
          code = 10002;
          msg = '手机号或密码错误，请重试'
        }
        if (err) {
          console.log("error!!!!!");
        } else {
          res.send({
            'code': code,
            'msg': msg,
            'data': data
          })
        }
      }
      dbConfig.sqlConnect(sql2, sqlArr2, callBack2);
    }
  }
  dbConfig.sqlConnect(sql1, sqlArr1, callBack1);
});

/**
 * 用户注册接口
 */
router.get('/user/register', async (req, res, next) => {
  let { username, number, password } = req.query;
  var sql1 = "select * from user where number=?";
  var sqlArr1 = [number];
  let code = 0;
  let msg = '注册成功';
  var callBack1 = (err, data) => {
    if (data && data.length > 0) {
      code = 10003;
      msg = '该手机号已经注册过'
      res.send({
        'code': code,
        'msg': msg,
        'data': data
      })
    } else {
      var sql2 = "insert into user (username,number, password) values (?,?, ?)";
      var sqlArr2 = [username, number, password];
      var callBack2 = (err, data) => {
        if (err) {
          code = 10004;
          msg = '注册失败，请重试'
        }
        res.send({
          'code': code,
          'msg': msg,
          'data': data
        })
      }
      dbConfig.sqlConnect(sql2, sqlArr2, callBack2);
    }
  }
  dbConfig.sqlConnect(sql1, sqlArr1, callBack1);
});
router.get('/user/searchAll', async (req, res, next) => {
  var sql = "select * from user";
  var sqlArr = [];
  var callBack = (err, data) => {
    if (err) {
      console.log("error!!!!!");
    } else {
      res.send({
        'list': data
      })
    }
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack)
});

router.post('/user/searchByNumber', async (req, res, next) => {
  var sql = "select * from user ";
  var sqlArr = [];
  var callBack = (err, data) => {
    if (err) {
      console.log("error!!!!!");
    } else {
      res.send({
        'list': data
      })
    }
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack)
});

router.get('/user/searchByUsername', async (req, res, next) => {
  var sql = "select * from user where username=?";
  var sqlArr = [];
  var callBack = (err, data) => {
    if (err) {
      console.log("error!!!!!");
    } else {
      res.send({
        'list': data
      })
    }
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack)
});

router.post("/user/uploadInfo", upload.fields([{ name: "avatar" }]), (req, res) => {
  const { username, signature, uid } = req.body;
  const { avatar } = req.files;

  // 构建动态的SQL语句，根据是否存在avatar决定是否更新avatar字段
  let sql = "UPDATE user SET username=?, signature=?";
  let sqlArr = [username, signature];

  if (avatar) {
    sql += ", avatar=?";
    sqlArr.push(avatar[0].path);
  }

  sql += " WHERE id=?";
  sqlArr.push(uid);

  var callBack = (err, data) => {
    if (err) {
      console.log("error!!!!!" + err);
    } else {
      res.send({
        'list': data
      })
    }
  }

  dbConfig.sqlConnect(sql, sqlArr, callBack)
});
module.exports = router;