var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/',function(req,res){
//数据
    let result={
        err:0,
        msg:'ok',
        data:{
            "name":"huawei",
            "price":"1999",
            "title":"huawei huawei huawei",
            "id":"1"
        }
    }
    res.send(result)
})

module.exports = router;