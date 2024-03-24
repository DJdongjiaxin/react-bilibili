const mysql = require('mysql');
module.exports = {
    // 数据库配置
    config: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'Djx0905#',
        database: 'eyepetizer'
    },
    // 链接数据库 使用mysql的连接池
    sqlConnect: function (sql, sqlArr, callBack) {
        var pool = mysql.createPool(this.config);
        pool.getConnection((err, conn) => {
            console.log("%%%%%%%%%%%%%%%%%%%%%%");
            if (err) {
                console.error('ERROR CONNECT MYSQL DATABASE');
                return;
            } else {
                console.log('success connect mysql database')
            }
            // 事件驱动回调
            conn.query(sql, sqlArr, callBack);
            // 释放连接
            conn.release();
        })
    }

}
