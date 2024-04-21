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

/**
 * 用户反馈
 */
router.get('/user/addFeedback', async (req, res, next) => {
  let { feedback, uid} = req.query;
  const timestamp = Date.now(); // 获取当前时间戳
  const date = new Date(timestamp).toISOString().slice(0, 19).replace('T', ' '); // 将时间戳转换为有效的日期和时间字符串

  var sql = "insert into feedback (feedback,uid, date) values (?,?, ?)";
  var sqlArr = [feedback, uid, date];
  let code = 0;
  let msg = '反馈成功';
  var callBack = (err, data) => {
    if (err) {
      code = 10004;
      msg = '反馈失败，请重试'
    }
    res.send({
      'code': code,
      'msg': msg,
      'data': data
    })
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack);
});

router.get('/admin/getUser', async (req, res, next) => {
  var sql = "select id,username,number,role from user";
  var sqlArr = [];
  var callBack = (err, data) => {
    if (err) {
      console.log("error!!!!!");
    } else {
      res.send({
        'code':0,
        'msg':'查询用户成功',
        'list': data
      })
    }
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack)
});
router.get('/admin/getComments', async (req, res, next) => {
  var sql = "select cid,vid,uid,content from comments";
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
router.get('/admin/getVideos', async (req, res, next) => {
  var sql = "select id,videoname,description from videos";
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
router.get('/admin/getFeedback', async (req, res, next) => {
  var sql = "select fid,feedback,uid from feedback";
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
router.get('/admin/getFeedback', async (req, res, next) => {
  var sql = "select feedback,uid from feedback";
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
/**
 * 删除用户
 */
router.get('/admin/delUser', async (req, res, next) => {
  let {id} = req.query;
  var sql = "DELETE FROM user WHERE id = ?";
  var sqlArr = [id];
  let code = 0;
  let msg = '删除用户成功';
  var callBack = (err, data) => {
    if (err) {
      code = 10004;
      msg = '删除用户失败，请重试'
    }
    res.send({
      'code': code,
      'msg': msg,
      'data': data
    })
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack);
});
/**
 * 删除视频
 */
router.get('/admin/delVideo', async (req, res, next) => {
  let {id} = req.query;
  var sql = "DELETE FROM videos WHERE id = ?";
  var sqlArr = [id];
  let code = 0;
  let msg = '删除视频成功';
  var callBack = (err, data) => {
    if (err) {
      code = 10004;
      msg = '删除视频失败，请重试'
    }
    res.send({
      'code': code,
      'msg': msg,
      'data': data
    })
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack);
});
/**
 * 删除评论
 */
router.get('/admin/delComment', async (req, res, next) => {
  let {id} = req.query;
  var sql = "DELETE FROM comments WHERE cid = ?";
  var sqlArr = [id];
  let code = 0;
  let msg = '删除评论成功';
  var callBack = (err, data) => {
    if (err) {
      code = 10004;
      msg = '删除评论失败，请重试'
    }
    res.send({
      'code': code,
      'msg': msg,
      'data': data
    })
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack);
});
/**
 * 删除反馈
 */
router.get('/admin/delFeedback', async (req, res, next) => {
  let {id} = req.query;
  var sql = "DELETE FROM feedback WHERE fid = ?";
  var sqlArr = [id];
  let code = 0;
  let msg = '删除反馈成功';
  var callBack = (err, data) => {
    if (err) {
      code = 10004;
      msg = '删除反馈失败，请重试'
    }
    res.send({
      'code': code,
      'msg': msg,
      'data': data
    })
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack);
});
/**
 * 修改用户角色
 */
router.get('/admin/editRole', async (req, res, next) => {
  let {role,id} = req.query;
  var sql = "UPDATE user SET role=? where id=?";
  var sqlArr = [role,id];
  let code = 0;
  let msg = '修改角色成功';
  var callBack = (err, data) => {
    if (err) {
      code = 10004;
      msg = '修改角色失败，请重试'
    }
    res.send({
      'code': code,
      'msg': msg,
      'data': data
    })
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack);
});
module.exports = router;