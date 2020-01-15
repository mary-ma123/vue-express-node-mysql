const { paramsInit, initStr } = require('../lib/db/paramsInit.js');
const { pool, router, Result } = require('../lib/db/index.js');

/* Post users listing.  多查询语句带条件  不用定义任何字段  查询语句拼接*/
router.post('/create', function(req,res) {
	var params = req.body || req.params; //查询参数对象
	let newParams = {
		//id:(new Date().getTime() / 100).toFixed(0).toString(),
		userName:params.userName,
		singleStatus:params.singleStatus,
		sex:params.sex,
		phone:params.phone,
		age:params.age,
		//createTime:new Date().getTime(),
	}
	let attrs = initStr(Object.keys(newParams),1);
	let str = initStr(Object.values(newParams),0);
	// 实例中 NOW() 是一个 MySQL 函数，该函数返回日期和时间。
	// 此处id为自增不需要插入  createTime可以设置mysql函数 NOW()  格式2020-01-14 19:25:25
	//const sqlList = `INSERT INTO usermanage (${attrs}) VALUES (${str})`; /*插入数据列表*/  id和插入时间自己处理
	//const sqlList = `INSERT INTO usermanage (${attrs}, createTime) VALUES (${str}, NOW())`; /*插入数据列表*/
	/*用户名或者手机号存在不插入数据,不存在则插入数据 ,此时id为自增 参考 https://www.cnblogs.com/mary-123/p/12193706.html */
	const sqlList = `insert into usermanage (${attrs}, createTime) select ${str}, NOW() from dual where not exists (select userName, phone from usermanage where userName='${params.userName}' or phone='${params.phone}')`;
	pool.getConnection((err, conn) => {
		conn.query(`${sqlList}`, (error, results) => {   //因为查询语句的条件都相同  则需把查询值 重复两遍即为[...sqlArr,...sqlArr]
			if (error) {
				throw error
			} else{
				if(results.affectedRows!=0 && results.insertId!=0){ //表示插入的数据id和行数存在
					res.json(new Result({
						data: {id:results.insertId}, 
						msg:'成功!',
					}))
				}else{
					res.json(new Result({
						data: null,
						code:10100,
						msg: '用户名或者手机号码已存在!',
					}))
				}
				console.log(results)
			}
		})
		pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
	})
});

module.exports = router;


/*注意事项
*INSERT INTO usermanage (${attrs}) VALUES (${str})
* VALUES前面的参数名称不用带引号,后面的值要带引号*/