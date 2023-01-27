/**
 *
 * @api_call load api_call module from node_modules/coinremitter-api/api_call to call api
 */
const api_call = require('./api_call');


/**
 *
 * @apikey string 
 * Coin api key
 */
const apikey = '';

/**
 *
 * @api_password string
 * Coin api password
 */
const api_password = '';

/**
 *
 * @coin string 
 * Coin which will use to transation
 */
const coin = '';


/**
 * Coinremitter Class
 *
 * Allows to do things with your crypto currencies like check balance of your wallet, 
 * deposit and withdraw from your wallet,create and get invoice, check tranascations etc. 
 */
class Coinremitter {

    
    /**
     * Pass your original creds to constructor
     *
     * @apikey    string
     * @password  string
     * @coin      string
     * @return    object
     */
    constructor(apikey, password,coin) {
        this.apikey = apikey;
        this.api_password = password;
        this.coin = coin;
    }

    
    /**
     * Get or Create new address of your wallet.
     *
     * @param  JSON object with following paramaters   
     *          label  string (required)  You will in response if specified
     * @callback  A function with 'error' and 'data' parameter
     *
     * @return    JSON ojbect
     */
    getNewAddress(param,callback){
        const api_data = {
            api_name:'/get-new-address',
            coin:this.coin,
            api_key: this.apikey,
            password : this.api_password,
        };
        api_call.apiPostCall(api_data,param,callback);
    }


    /**
     * Validate your wallet address and to check if your wallet address is valid or not
     *
     * @param  JSON object with following paramaters   
     *          address  string (required)  A wallet address which you want to check
     * @callback  A function with 'error' and 'data' parameter
     *
     * @return    JSON object
     */  
    validateAddress(param,callback){
        const api_data = {
            api_name:'/validate-address',
            coin:this.coin,
            api_key: this.apikey,
            password : this.api_password,
        };
        api_call.apiPostCall(api_data,param,callback);
    }


    /**
     * To withdraw from wallet and to deposit to someone's wallet
     *
     * @param  JSON object with following paramaters   
     *          to_address  string (required)           A wallet address which you want to transfer
     *          amount      int,float,double (required) Amount which will be transferred 
     * @callback  A function with 'error' and 'data' parameter
     *
     * @return    JSON object
     */
    withdraw(param,callback){
        const api_data = {
            api_name:'/withdraw',
            coin:this.coin,
            api_key: this.apikey,
            password : this.api_password,
        };
        api_call.apiPostCall(api_data,param,callback);
    }
  
    
    /**
     * Get transaction detail of your withdrawal
     *
     * @param  JSON object with following paramaters   
     *          id   string (required) 'id' which you got from withdraw() response
     * @callback  A function with 'error' and 'data' parameter
     *
     * @return    JSON object
     */
    getTransaction(param,callback){
        
        const api_data = {
            api_name:'/get-transaction',
            coin:this.coin,
            api_key: this.apikey,
            password : this.api_password,
        };
        api_call.apiPostCall(api_data,param,callback);
    }

    
    /**
     * Get transaction detail of your wallet address
     *
     * @param  JSON object with following paramaters   
     *          address string (required) A wallet address whose transaction list you want
     * @callback  A function with 'error' and 'data' parameter
     *
     * @return    JSON object
     */
    getTransactionByAddress(param,callback){
        
        const api_data = {
            api_name:'/get-transaction-by-address',
            coin:this.coin,
            api_key: this.apikey,
            password : this.api_password,
        };
        api_call.apiPostCall(api_data,param,callback);
    }


    /**
     * Get current balace of your wallet
     *
     * @callback  A function with 'error' and 'data' parameter
     *
     * @return    JSON object
     */
    getBalance(callback){
        
        const api_data = {
            api_name:'/get-balance',
            coin:this.coin,
            api_key: this.apikey,
            password : this.api_password,
        };
        api_call.apiPostCall(api_data,{},callback);
    }

   
    /**
     * Create Invoice
     *
     * @param  JSON object with following paramaters   
     *          amount        number (required)  Invoice amount
     *          name          string (optional)  Invoice name
     *          currency      string (optional)  type (ex. INR)
     *          expire_time   number (optional)  In minutes
     *          notify_url    string (optional)  You will be notify on this valid URL
     *          suceess_url   string (optional)  Success will be redirected to this valid URL
     *          fail_url      string (optional)  Failure will be redirected to this valid URl
     *          description   string (optional)  Any note for Invoice
     *
     * @callback  A function with 'error' and 'data' parameter
     *
     * @return    JSON object
     */
    createInvoice(param,callback){
        const api_data = {
            api_name:'/create-invoice',
            coin:this.coin,
            api_key: this.apikey,
            password : this.api_password,
        };
        api_call.apiPostCall(api_data,param,callback);
    }

    
    /**
     * Get Invoice which you have created from createInvoice()
     *
     * @param  JSON object with following paramaters   
     *          invoice_id    string (required)  which you got from createInvoice() response
     * @callback  A function with 'error' and 'data' parameter
     *
     * @return    JSON object
     */
    getInvoice(param,callback){
        const api_data = {
            api_name:'/get-invoice',
            coin:this.coin,
            api_key: this.apikey,
            password : this.api_password,
        };
        api_call.apiPostCall(api_data,param,callback);
    }
  

    /**
     * Get fiat to crypto rate from getFiatToCryptoRate()
     *
     * @param  JSON object with following paramaters   
     *          fiat_symbol   string (required)  Fiat Symbol, Ex. USD,EUR
     *          fiat_amount   string (required)  Amount to b convert in crypto
     * @callback  A function with 'error' and 'data' parameter
     *
     * @return    JSON object
     */
    getFiatToCryptoRate(param,callback){
        const api_data = {
            api_name:'/get-fiat-to-crypto-rate',
            coin:this.coin,
            api_key: this.apikey,
            password : this.api_password,
        };
        api_call.apiPostCall(api_data,param,callback);
    }
    

    /**
     * Get all coins current rates in USD
     *
     * @callback  A function with 'error' and 'data' parameter
     *
     * @return    JSON object
     */
    getCoinRate(callback){
        const api_data = {
            api_name:'/get-coin-rate',
            coin:this.coin
        };
        api_call.apiGetCall(api_data,callback);
    }

}

module.exports = Coinremitter;