/**
 *
 * @https load https module which is node js built-in module to transafer data
 */
const https = require("https");

/**
 *
 * @querystring load querystring module which is node js built-in module to provides utilities for parsing and formatting URL query strings
 */
const querystring = require('querystring');

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
const url = '/api/';

/**
*
* @version string version of api
*/  
const version = 'v3';

/**
*
* @domain string hostname
*/  
const domain = 'coinremitter.com';

/**
*
* @plugin_version string version of plugin
*/  
const plugin_version = '1.1.0';

/**
*
* @user_agent string user agent
*/  
const user_agent = 'CR@' + version + ',node plugin@' + plugin_version;

module.exports = {
    apiGetCall: function (api_data,callback) {
        const path = url + version  + api_data.api_name;
        var post_data = querystring.stringify(api_data);

        const options = {
            hostname: domain,
            path: path,
            method: 'GET',
            headers: {
                'User-Agent': user_agent,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(post_data)
            }
        };
        const req = https.request(options, (response) => {
            if (callback && typeof callback === 'function') {
                if (response.statusCode == 200) { 
                    let resData = ''
                    response.on('data', (data) => {
                        resData += data;
                    });
                    response.on('end', () => {
                        if(common.IsValidJSONString(resData)){
                            resData = JSON.parse(resData);
                            if (resData.flag == 1) {
                                callback(null,resData);
                            }else{
                                error = resData;
                                logger.log('error', 'Parameter validation Error');
                                callback(error,null);
                            }
                        }else{
                            logger.log('error', 'Getting problem on parse json string');
                            callback({"flag":0, "msg":"Oops something went wrong !!!"},null);   
                        }
                    });
                }else{
                    logger.log('error', 'Getting problem on get a response from server. Check API URL');
                    callback({"flag":0, "msg": response.statusCode + " : " + response.statusMessage},null);
                }
            }else{
                logger.log('error', 'Please define callback function');
            }
        })
        req.write(post_data);
        req.end();
       
    },
    apiPostCall: function (api_data,param={},callback) {
        const data = {...api_data, ...param };

        const path = url + version + '/' + api_data.coin + api_data.api_name;
        var post_data = querystring.stringify(data);
        const options = {
            hostname: domain,
            path: path,
            method: 'POST',
            headers: {
                'User-Agent': user_agent,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(post_data)
            }
        };
        const req = https.request(options, (response) => {
            if (callback && typeof callback === 'function') {
                if (response.statusCode == 200) { 
                    let resData = ''
                    response.on('data', (data) => {
                        resData += data;
                    });
                    response.on('end', () => {
                        if(common.IsValidJSONString(resData)){
                            resData = JSON.parse(resData);
                            if (resData.flag == 1) {
                                callback(null,resData);
                            }else{
                                error = resData;
                                logger.log('error', 'Parameter validation Error');
                                callback(error,null);
                            }
                        }else{
                            logger.log('error', 'Getting problem on parse json string');
                            callback({"flag":0, "msg":"Oops something went wrong !!!"},null);   
                        }
                    });
                }else{
                    logger.log('error', 'Getting problem on get a response from server. Check API URL');
                    callback({"flag":0, "msg": response.statusCode + " : " + response.statusMessage},null);
                }
            }else{
                logger.log('error', 'Please define callback function');
            }
        }) 
        req.write(post_data);
        req.end();
    },
};
