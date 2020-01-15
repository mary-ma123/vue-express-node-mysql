const { paramsInit } = require('../lib/db/paramsInit.js');
const { pool, router, Result } = require('../lib/db/index.js');

/* Post users listing.  多查询语句带条件  不用定义任何字段  查询语句拼接*/
router.post('/', function(req,res) {
	var params = req.body || req.params; //查询参数对象
	var obj = paramsInit(params);  //其中还包含没有使用的参数key的数组keyArr
	if(obj.l > 0){ //没有参数的时候 针对必传参数情况
		const sqlList = `SELECT * FROM usermanage ${obj.sqlStr};` /*查询列表*/
		const sqlCount = `SELECT COUNT(*) as total FROM usermanage ${obj.sqlStr}` /*查询总条数   SELECT COUNT(id) as total FROM usermanage*/
		pool.getConnection((err, conn) => {
			conn.query(`${sqlList}${sqlCount}`, [...obj.sqlArr,...obj.sqlArr], (error, result) => {   //因为查询语句的条件都相同  则需把查询值 重复两遍即为[...sqlArr,...sqlArr]
				if (error) throw error
				res.json(new Result({
					data: {
						list:result[0],
						total:result[1][0].total
					}, 
					msg:'成功',
				}))
			})
			pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
		})
	}else{
		res.json(new Result({
			code: 400,
			data: null, 
			msg:'参数不正确!',
		}))
	}
});

module.exports = router;