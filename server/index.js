const { app, pool, Result, express } = require('./lib/db/index.js');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/*接口start*/
var listsRouter = require('./routes/list');
var userListsRouter = require('./routes/userlist');
var getlistsRouter = require('./routes/getlists');
var createlistRouter = require('./routes/createlist');
var removelistRouter = require('./routes/removelist');
var updatelistRouter = require('./routes/updatelist');
/*接口end*/

/* 引入cors */
const cors = require('cors');
app.use(cors());
 
/* 引入body-parser */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.all('/', (req, res) => {
    pool.getConnection((err, conn) => {
        res.json({ type: 'test'})
        pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
    })
})

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*对外接口start*/
app.use('/lists/query1', listsRouter);
app.use('/lists/query', userListsRouter);
app.use('/lists/get', getlistsRouter);
app.use('/lists/post', createlistRouter);
app.use('/lists/post', removelistRouter);
app.use('/lists/post', updatelistRouter);
/*对外接口end*/

app.listen(3036, () => {  //8090 接口访问端口
    console.log('服务启动 3036')
})

module.exports = app
