const DB = require("../dbconfig"); // 导入数据库配置文件
const Sequelize = require("sequelize"); // 导入模块

// stu是数据库的表名
const userModel = DB.define("user", {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER, // 数据类型改为INT
        field: "id",
        autoIncrement: true // 自增
    },
    username: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: '匿名', // 默认值为'匿名'
        field: "username"
    },
    number: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        field: "number"
    },
    password: {
        type: Sequelize.STRING(30), // 数据类型改为STRING(30)
        allowNull: false,
        defaultValue: '123456', // 默认值为'123456'
        field: "password"
    },
    sex: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '女', // 默认值为'女'
        field: "sex"
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = userModel;