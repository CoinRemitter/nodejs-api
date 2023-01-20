/**
 *
 *  It will logged info, warning, error messages into console
 */

var logger = exports;
logger.debugLevel = 'error';
logger.log = function(level, message) {
  	var levels = ['info', 'warn', 'error'];
  	if (levels.indexOf(level) <= levels.indexOf(logger.debugLevel) ) {
    	if (typeof message !== 'string') {
      		message = JSON.stringify(message);
    	};
    	let date_ob = new Date();
    	let date_time = date_ob.getFullYear() + "-" + ("0" + (date_ob.getMonth() + 1)).slice(-2) + "-" + ("0" + date_ob.getDate()).slice(-2) + " " + ("0" + (date_ob.getHours())).slice(-2) + ":" + ("0" + (date_ob.getMinutes())).slice(-2) + ":" + ("0" + (date_ob.getSeconds())).slice(-2);
    	console.log(date_time+' '+level+': '+message);
  	}
}