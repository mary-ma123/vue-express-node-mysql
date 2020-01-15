function deleteObjEmpty(obj) { //清除对象中的空属性
	for (var i in obj) {
		if (obj[i] === '' || obj[i] === null) {
			delete obj[i]
		}
	}
	return obj;
};

// 返回参数 初始化  查询
var paramsInit = function(params) {
	params = deleteObjEmpty(params); //清空属性值为null或""的属性
	var sqlStrArr = Object.keys(params); //查询参数的key值集合
	var l = sqlStrArr.length; //获取对象的长度
	var obj = {};
	var sqlStr = "";
	obj.l = l;
	if(l > 0){
		sqlStr = "WHERE ";
		var i = 0
		while(i < l){
			if(i == (l - 1)){
				sqlStr = sqlStr + sqlStrArr[i] + ' = ?'
			}else{
				sqlStr = sqlStr + sqlStrArr[i] + ' = ? and '
			}
			i++;
		}
		var sqlArr =  Object.values(params); //将params中对象的值转换成数组
		obj.keyArr = sqlStrArr;
		obj.sqlStr = sqlStr;
		obj.sqlArr = sqlArr;
	}else{
		obj.keyArr = [];
		obj.sqlStr = sqlStr;
		obj.sqlArr = [];
	}
	return obj;
}

var initStr = function(val,type){  //新增
	let str = "";
	for(let i in val){
		if(type==0){
			if(i==0){
				str = str + "'" + val[i] + "'";
			}else{
				str = str + ",'" + val[i] + "'";
			}
		}else{
			if(i==0){
				str = str + val[i];
			}else{
				str = str + "," + val[i];
			}
		}
	}
	return str;
}

var initUpdateStr = function(params) { //更新
	params = deleteObjEmpty(params); //清空属性值为null或""的属性
	var str = "";
	var keys = Object.keys(params); //获取所有不为空的对象属性集合
	for(let i in params){
		if(i==keys[0]){ //此时i为key
			str = str + " " + i + " = '" + params[i] + "'"
		}else{
			str = str + ", " + i + " = '" + params[i] + "'"
		}
	}
	return str
}

module.exports = { paramsInit, initStr, initUpdateStr }