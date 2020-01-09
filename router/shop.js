const express = require('express');
const router = express.Router();
// 获取数据库信息
const getMysql = require("../mysql")
router.get("/", (req, res) => {
    // 参数结构
    let {classify} = req.query;
    // 创建数据库实例
    const db = getMysql();
    // 连接数据库
    db.connect();
    // 数据库指令，结构的参数，函数输出结果
    db.query("SELECT * FROM 表名称 where classify = ?", [classify], (err, sqlData) => {
        // 把结果返回前端 => .send方法返回各种类型
        res.send("连接成功",sqlData);
    })
    // 断开数据库连接
    db.end();

})

// const app = express()
// app.use("/",router)
//导出数据
// module.exports = router;
module.exports = router