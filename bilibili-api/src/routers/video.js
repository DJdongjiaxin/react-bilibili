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
  const { videoName, videoDescription, number } = req.body;
  const { coverImage, videoFile } = req.files;
  var sql = "INSERT INTO videos (videoname, description, cover_image, video_file,user_number) VALUES (?, ?, ?, ?, ?)";
  var sqlArr = [videoName, videoDescription, coverImage[0].path, videoFile[0].path, number];
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
 * 查询投稿视频接口
 */
router.get('/video/getVideo', async (req, res, next) => {
  let { number } = req.query;
  var sql1 = "select * from videos where user_number=?";
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
module.exports = router;
