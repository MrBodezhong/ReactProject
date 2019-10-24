/*****数据库查询语句封装 */

// 1. 按库表名 条件查询 通用查询

const search_params = {
    '/websites': function (url = '', params = {}) {
        
        /****url  String  是请求路由  
         * params  Object 是请求参数 */
        if (JSON.stringify(params) === '{}') {
            
            let sql;
            //查询条件为空 默认搜索全部
            let url_arr = url.split('/');
            if (url_arr.length > 2) {
                //多表关联查询  
            } else {
                sql = 'SELECT * FROM ' + url_arr[1]
            }
            return sql
        } else if (typeof params !== 'object') {
            return false
        } else {

        }
    }
}

module.exports = search_params