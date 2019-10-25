/*****数据库查询语句封装 */

// 1. 按库表名 条件查询 通用查询

const search_params = {
    '/websites': function (url = '', params = {}) {

        let url_arr = url.split('/');
        /****url  String  是请求路由  
         * params  Object 是请求参数 */
        return 'SELECT * FROM ' + url_arr[1]
    },
    '/area_table': function (url = '', params = {}) {
        let url_arr = url.split('/');
        /****url  String  是请求路由  
         * params  Object 是请求参数 */
        return 'SELECT * FROM ' + url_arr[1]
    }
}

module.exports = search_params