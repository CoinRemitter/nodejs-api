
const url = 'http://192.168.0.102/coinremitter/public/api/';
const request = require('request');

class Coinremitter {
    /**
     * pass valid coin detail with api_key,password,coin.
     */
  constructor(apikey, password,coin) {
    this.apikey = apikey;
    this.password = password;
    this.coin = coin;
  }
  

 /**
 * get balance of specified coin.
 * @return json() returns array with success or error response.
 */
  getBalance(){
    var api_url = url+this.coin+'/get-balance';
    var param = {api_key: this.apikey,password : this.password};
    var response = this.getApiCall(api_url,param);
    return response;
  }
  
/**
 * get new address for specified coin.
 * @param string label Optional, label assign to new address.
 * @return json() returns array with success or error response.
 */
  getNewAddress(param){
    var api_url = url+this.coin+'/get-new-address';
    var api_data = {api_key: this.apikey,password : this.password};
    var param = {...api_data, ...param }
    var response = this.getApiCall(api_url,param);
    return response;
  }

/**
 * validate address for specified coin.
 * @param string address address to verify.
 * @return json() returns array with success or error response.
 */  

  validateAddress(param){
    var api_url = url+this.coin+'/validate-address';
    var api_data = {api_key: this.apikey,password : this.password};
    var param = {...api_data, ...param }
    var response = this.getApiCall(api_url,param);
    return response;
  }

/**
 * withdraw coin to specific address.
 * @param json param pass to_address and amount in array to withdraw amount.
 * @return json returns json with success or error response.
 */
  withdraw(param){
    var api_url = url+this.coin+'/withdraw';
    var api_data = {api_key: this.apikey,password : this.password};
    var param = {...api_data, ...param }
    var response = this.getApiCall(api_url,param);
    return response;
  }
  
/**
 * get transaction details of given transaction id.
 * @param string id pass id to get transaction detail.
 * @return json returns json with success or error response.
 */
  getTransaction(param){
    var api_url = url+this.coin+'/get-transaction';
    var api_data = {api_key: this.apikey,password : this.password};
    var param = {...api_data, ...param }
    var response = this.getApiCall(api_url,param);
    return response;
  }
  
/**
 * create invoice for deposit balance.
 * @param jason param pass parameters in json to generate invoice.
 * @return json returns json with success or error response.
 */
  createInvoice(param){
    var api_url = url+this.coin+'/create-invoice';
    var api_data = {api_key: this.apikey,password : this.password};
    var param = {...api_data, ...param }
    var response = this.getApiCall(api_url,param);
    return response;
  }

/**
 * get invoice details of given invoice id.
 * @param string id pass id to get invoice detail.
 * @return json returns json with success or error response.
 */  
  getInvoice(param){
    var api_url = url+this.coin+'/get-invoice';
    var api_data = {api_key: this.apikey,password : this.password};
    var param = {...api_data, ...param }
    var response = this.getApiCall(api_url,param);
    return response;
  }
  

/**
 * get all coin usd rate.
 * @return json returns json with success or error response.
 */
  getCoinRate(){
    var api_url = url+'get-coin-rate';
    var response = this.getApiCall(api_url); 
    return response;
  }

 /** 
  * @param string url
  * @param json param optional, parameters.
  * @return json
  */
  getApiCall(url,param=''){
    var data = param;
    
    if(!data){
      request({
        uri: url,
        method: "GET",
        form: data
      }, function(error, response, body) {
        console.log(body);
      });
    }else{
      request({
        uri: url,
        method: "POST",
        form: data
      }, function(error, response, body) {
        console.log(body);
      });
    }
  }
}
module.exports = Coinremitter