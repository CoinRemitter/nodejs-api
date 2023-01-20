/**
*
* @request load request module from node_modules/request
*/
const request = require('request');

/**
 *
 * @common load common module from node_modules/coinremitter-api/common to use common functions
 */
const common = require('./common');


/**
 *
 * @logger load logger module from node_modules/coinremitter-api/logger to get logger
 */
let logger = require('./logger');



/**
*
* @url string endpoint of api
*/
    
const version = 'v3';

const url = 'https://coinremitter.com/api/';

const plugin_version = '1.0.7';

const user_agent = 'CR@' + version + ',node plugin@' + plugin_version;

module.exports = {
    apiGetCall: function (api_data,callback) {
        const api_url = url + version + '/' + api_data.api_name;
        request({
            uri: api_url,
            method: "GET",
            form: api_data
        }, 
        function(error, response, body) {
            if (callback && typeof callback === 'function') {
                if (response.statusCode == 200) { 
                    if(common.IsValidJSONString(body)){
                        const resData = JSON.parse(body);
                        if (resData.flag == 1) {
                            callback(error,resData);
                        }else{
                            error = resData;
                            logger.log('error', 'Parameter validation Error');
                            callback(error,null);
                        }
                    }else{
                        logger.log('error', 'Getting problem on parse json string');
                        callback({"flag":0, "msg":"Oops something went wrong !!!"},null);   
                    }
                }else{
                    logger.log('error', 'Getting problem on get a response from server. Check API URL');
                    callback({"flag":0, "msg": response.statusCode + " : " + response.statusMessage},null);
                }
            }else{
               logger.log('error', 'Please define callback function');
            }
        });
    },
    apiPostCall: function (api_data,param={},callback) {
        const api_url = url + version + '/' + api_data.coin + api_data.api_name;
        const data = {...api_data, ...param };
        request({
            uri: api_url ,
            method: "POST",
            form: data,
            headers: { 'User-Agent': user_agent }
        }, 
        function(error, response, body) {
            if (callback && typeof callback === 'function') {
                if (response.statusCode == 200) { 
                    if(common.IsValidJSONString(body)){ 
                        const resData = JSON.parse(body);
                        if (resData.flag == 1) {
                            callback(error,resData);
                        }else{
                            error = resData;
                            logger.log('error', 'Parameter validation Error');
                            callback(error,null);
                        }
                    }else{
                        logger.log('error', 'Getting problem on parse json string');
                        callback({"flag":0, "msg":"Oops something went wrong !!!"},null);   
                    }
                }else{
                    logger.log('error', 'Getting problem on get a response from server. Check API URL');
                    callback({"flag":0, "msg": response.statusCode + " : " + response.statusMessage},null);
                }
            }else{
               logger.log('error', 'Please define callback function');
            }
        });
    }
};
