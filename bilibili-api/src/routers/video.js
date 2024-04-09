const express = require("express");
const {
  fetchVideoDetail,
  fetchPlayUrl,
  fetchRecommendById,
  fetchReplay,
  fetchBarrage
} = require("../api");
const { parseString } = require("xml2js");
const multer = require('multer')
const router = express.Router();
const dbConfig = require('../dbconfig');
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
// 视频详情
router.get("/av/:aId", (req, res, next) => {
  if (req.path == "/av/replay" || req.path == "/av/play_url") {
    next();
    return;
  }
  fetchVideoDetail(req.params.aId).then((data) => {
    const resData = {
      code: "1",
      msg: "success",
      data
    }
    if (data.code === 0) {
      resData.data = data.data;
    } else {
      resData.code = "0";
      resData.msg = "fail";
    }
    res.send(resData);
  }).catch(next);
});

// 视频地址
router.get("/av/play_url", (req, res, next) => {
  fetchPlayUrl(req.query.aId, req.query.cId).then((data) => {
    let resData = {
      code: "1",
      msg: "success"
    }
    if (data.code === 0) {
      resData.data = data.data;
    } else {
      resData.code = "0";
      resData.msg = "fail";
    }
    res.send(resData);
  }).catch(next);
});

router.get("/av/recommend/:aId", (req, res, next) => {
  fetchRecommendById(req.params.aId).then((data) => {
    let resData = {
      code: "1",
      msg: "success"
    }
    if (data.code === 0) {
      resData.data = data.data;
    } else {
      resData.code = "0";
      resData.msg = "fail";
    }
    res.send(resData);
  }).catch(next);
});

router.get("/av/replay", (req, res, next) => {
  let aId = req.query.aId;
  let p = req.query.p;
  fetchReplay(aId, p).then((data) => {
    let resData = {
      code: "1",
      msg: "success"
    }
    if (data.code === 0) {
      resData.data = data.data;
    } else {
      resData.code = "0";
      resData.msg = "fail";
    }
    res.send(resData);
  }).catch(next);
});

router.get("/av/barrage/:cId", (req, res, next) => {
  fetchBarrage(req.params.cId).then((xml) => {
    parseString(xml, { explicitArray: false, trim: true }, (err, result) => {
      if (!err) {
        let resData = {
          code: "1",
          msg: "success",
          data: []
        }
        if (result.i.d) {
          result.i.d.forEach((item) => {
            let p = item.$.p;
            let attrs = p.split(",");
            resData.data.push({
              time: attrs[0],  // 时间
              type: attrs[1],  // 类型
              decimalColor: attrs[3],  // 十进制颜色
              sendTime: attrs[4],   // 发送时间
              content: item._,  // 内容
              p
            });
          });
        }
        res.send(resData);
      } else {
        next(err);
      }
    });

  }).catch(next);
});
// 上传视频和图片的接口
router.post("/video/send", upload.fields([{ name: "coverImage" }, { name: "videoFile" }]), (req, res) => {
  const { videoName, videoDescription, username,uid} = req.body;
  const { coverImage, videoFile } = req.files;
  const timestamp = Date.now(); // 获取当前时间戳
  const date = new Date(timestamp).toISOString().slice(0, 19).replace('T', ' '); // 将时间戳转换为有效的日期和时间字符串
  var sql = "INSERT INTO videos (videoname, description, cover_image, video_file,username,date,uid) VALUES (?, ?, ?, ?, ?, ?, ?)";
  var sqlArr = [videoName, videoDescription, coverImage[0].path, videoFile[0].path, username, date,uid];
  var callBack = (err, data) => {
    if (err) {
      console.log("error!!!!!"+err);
    } else {
      res.send({
        'list': data
      })
    }
  }
  dbConfig.sqlConnect(sql, sqlArr, callBack)
});

/**
 * 查询投稿视频接口(依照用户id)
 */
router.get('/video/getVideo', async (req, res, next) => {
  let { number } = req.query;
  var sql1 = "select * from videos where uid=?";
  var sqlArr1 = [number];
  let code = 0;
  let msg = '查询用户投稿视频成功';
  var callBack1 = (err, data) => {
    if (data && data.length > 0) {
      // code = 10005;
      // msg = '该用户暂无投稿视频'
      res.send({
        'code': code,
        'msg': msg,
        'data': data
      })
    }
  }
  dbConfig.sqlConnect(sql1, sqlArr1, callBack1);
});

/**
 *  搜索视频接口
 */
router.get('/video/search', async (req, res, next) => {
  let { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required' });
  }

  var sql1 = "SELECT * FROM videos WHERE videoname LIKE ? OR description LIKE ?";
  var sqlArr1 = [`%${keyword}%`, `%${keyword}%`];
  let code = 0;
  let msg = '搜索视频成功';
  var callBack1 = (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while searching for videos' });
    } else {
      res.send({
        'code': code,
        'msg': msg,
        'data': data
      });
    }
  }
  dbConfig.sqlConnect(sql1, sqlArr1, callBack1);
});

/**
 *  查询video具体信息
 */
router.get('/video/info', async (req, res, next) => {
  let { vid } = req.query;
  var sql1 = "select * from videos where id=?";
  var sqlArr1 = [vid];
  let code = 0;
  let msg = '查询视频详情信息成功';
  var callBack1 = (err, data) => {
    if (data && data.length > 0) {
      res.send({
        'code': code,
        'msg': msg,
        'data': data[0]
      })
    }
  }
  dbConfig.sqlConnect(sql1, sqlArr1, callBack1);
});

/**
 *  获取当前video的所有评论
 */
router.get('/video/commends', async (req, res, next) => {
  let { vid } = req.query;
  var sql1 = "select * from comments where vid=?";
  var sqlArr1 = [vid];
  let code = 0;
  let msg = '查询评论列表成功';
  var callBack1 = async (err, data) => {
    if (data && data.length > 0) {
      // 使用Promise.all同时查询所有用户信息
      const userInfoPromises = data.map(comment => {
        let uid = comment.uid;
        var sql2 = "select * from user where id=?";
        var sqlArr2 = [uid];
        return new Promise((resolve, reject) => {
          dbConfig.sqlConnect(sql2, sqlArr2, (err, userInfo) => {
            if (err) {
              reject(err);
            } else {
              resolve(userInfo[0]);
            }
          });
        });
      });

      try {
        const userInfos = await Promise.all(userInfoPromises);
        data.forEach((comment, index) => {
          comment.user = userInfos[index]; // 将用户信息添加到评论对象中
        });
        res.send({
          'code': code,
          'msg': msg,
          'data': data
        });
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }
  }
  dbConfig.sqlConnect(sql1, sqlArr1, callBack1);
});
module.exports = router;
