const mysql = require('mysql')
const express = require('express')
const app = express()
const router = express.Router();

// 解析参数
const bodyParser = require('body-parser')
let login = true;
// json请求
app.use(bodyParser.json())
// 表单请求
app.use(bodyParser.urlencoded({extended: false}))

const option = {
    host: 'localhost', /*服务器名称*/
    user: 'root',  /*服务器连接名称*/
    password: '123456', /*服务器密码*/
    database: 'test', /*数据库*/
	port: '3306', //服务器端口
    connectTimeout: 5000, //连接超时
    multipleStatements: true //是否允许一个query中包含多条sql语句
}
let pool;
repool()
function Result ({ code = 1, msg = '', data = {} }) {
    this.code = code;
    this.msg = msg;
    this.data = data;
}
// 断线重连机制
function repool() {
    // 创建连接池
    pool = mysql.createPool({
        ...option,
        waitForConnections: true, //当无连接池可用时，等待（true）还是抛错（false）
        connectionLimit: 100, //连接数限制
        queueLimit: 0 //最大连接等待数（0为不限制）
    })
    pool.on('error', err => {
        err.code === 'PROTOCOL_CONNECTION_LOST' && setTimeout(repool, 2000)
    })
    app.all('*', (_,__, next) => {
        pool.getConnection( err => {
            err && setTimeout(repool, 2000) || next()
        })
    })
}

module.exports = { app, pool, Result, router, express }

// const userSQL = {
//     queryAll: 'select * from user',   // 查询所有用户
//     queryByName: 'select * from  user where username=?',  // 通过用户名索引查询用户
//     queryByNamePassword: 'select * from  user where username=? and password=?',  // 通过用户名和密码索引查询用户
//     insert: 'insert into user set ?',  // 插入新用户
//     updateUser: 'update user set ? where username=?',// 更新用户信息
//     deleteUser: 'delete from user where username=?' // 删除用户
// }
