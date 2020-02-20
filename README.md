# coinremitter-nodejs
coinremitter packege for nodejs
## installation guide.
you can install coinremitter package using npm in your project using : 
```
npm install coinremitter_nodejs
```
 
 ## Usage of Package : 
 
 you have to include package wherever you want to use this like,
 ```
const coinremitter = require('coinremitter');

 ```
 after using name space you can access all the methods of package by creating object of class like ,
 ```
 const obj = new coinremitter('YOUR_API_KEY','PASSWORD','BTC');
 ```
 

### Get Balance : 
you can get balance of your wallet using get_balance call.
```
balance = obj.getBalance();
```
this will return either success response or error response if something went wrong.like below is the success response : 
```
{
  "flag": 1,
  "msg": "Get balance successfully !",
  "action": "get-balance",
  "data": {
    "balance": 1.55882809,
    "wallet_name": "wp-withd",
    "coin_name": "Bitcoin"
  }
}
```

### Create New Wallet Address
You can get new wallet address using folowing method:
```
address = obj.getNewAddress();
```
success response : 
```
{
  "flag": 1,
  "msg": "New address created successfully !",
  "action": "get-new-address",
  "data": {
    "address": "QhZ29R3bj5gVxW67wtL75c4UnaHjr8HBje",
    "label": ""
  }
}

```
also you can assign lable to your address with passing parameter to get_new_address method like:
```
param = {
    'label':'my_label'
}
address = obj.getNewAddress(param);
```
the response will add given label at label key.
```
{
    "flag":1,
    "msg":"New address created successfully !",
    "action":"get-new-address",
    "data":{
        "address":"MMtU5BzKcrew9BdTzru9QyT3YravQmzokh",
        "label":"my_label"
    }
}
```
### Validate wallet address
for validation wallet address use folowing method:
```
param = {
    'address':'your_Address_to_validate'
}
validate = obj.validateAddress(param);
```
success response :  
```
{
  "flag": 1,
  "msg": "success",
  "action": "validate-address",
  "data": {
    "valid": true
  }
}

```
if ```valid``` in ```data``` response is ```true``` then the given address is valid,otherwise it's a invalid address.

### Withdraw amount 
to withdraw amount to specific  address following method will use : 

```
param = {
    'to_address':'YOUR_ADDRESS',
    'amount':123
}
withdraw = obj.withdraw(param);
```
success response : 
```
{
    "flag":1,
    "msg":"Amount Successfully Withdraw !",
    "action":"withdraw",
    "data":{
        "id":"5b5ff10a8ebb830edb4e2a22",
        "txid":"1147aca98ced7684907bd469e80cdf7482fe740a1aaf75c1e55f7a60f725ba28",
        "explorer_url":"http://btc.com/exp/1147aca98ced7684907bd469e80cdf7482fe740a1aaf75c1e55f7a60f725ba28",
        "amount":0.1,
        "transaction_fees":0.001,
        "processing_fees":0.00023,
        "total_amount":0.10123,
        "to_address":"YOUR_ADDRESS",
        "wallet_id":"5c42ea0ab846fe751421cfb2",
        "wallet_name":"wallet_name",
        "coin_short_name":"BTC",
        "date":"2019-06-02 01:02:03"
    }
}

```

### Get Transaction
get transaction detail using id received from ```withdraw amount``` response's ```id``` or from webhook's ```id``` field using following method :
```
param = {
    'id':'5b5ff10a8ebb830edb4e2a22'
}
transaction = obj.getTransaction(param);
```
success response : 
```
{
  "flag": 1,
  "msg": "success",
  "action": "get-transaction",
  "data": {
    "id": "5e01a3b1b846fe2ab4276273",
    "txid": "cef97db05f6afd5a5a30ff1b20d32262b760748acb88317479431be9ca771881",
    "explorer_url": "http://192.168.0.102/coinremitter/public/tcn/tx/cef97db05f6afd5a5a30ff1b20d32262b760748acb88317479431be9ca771881",
    "type": "send",
    "merchant_id": "5bc46fb28ebb8363d2657347",
    "coin_short_name": "TCN",
    "wallet_id": "5e01a2b7b846fe7a033e2962",
    "wallet_name": "MyTCNWallet",
    "address": "QRyK17VnxQxdWmLZSNyh2jVW2SDa5TzA7B",
    "amount": 0.1,
    "confirmations": 71846,
    "date": "2019-12-24 11:05:45",
    "transaction_fees": 0.000001,
    "processing_fees": 0.005,
    "total_amount": 0.105001
  }
}
```
if reponse data object contains ```type``` is equal to ```send``` then response will be given as below
```
{
    "flag":1,
    "msg":"success",
    "action":"get-transaction",
    "data":{
        "id":"5b5ff10a8ebb830edb4e2a22",
        "txid":"1147aca98ced7684907bd469e80cdf7482fe740a1aaf75c1e55f7a60f725ba28",
        "explorer_url":"http://btc.com/exp/1147aca98ced7684907bd469e80cdf7482fe740a1aaf75c1e55f7a60f725ba28",
        "type":"send",
        "merchant_id":"5bc46fb28ebb8363d2657347",
        "coin_short_name":"BTC",
        "wallet_id":"5c42ea0ab846fe751421cfb2",
        "wallet_name":"wallet_name",
        "address":"QYTZkkKz7n1sMuphtxSPdau6BQthZfpnZC",
        "amount":0.0003,
        "confirmations":3,
        "date":"2018-08-15 15:10:42"
        "transaction_fees":0.001,
        "processing_fees":0.1,
        "total_amount":"2.10100000"
        
    }
}
```
### Create Invoice
you can create invoice using following method : 
```
param = {
    'amount':123,      //required.
    'notify_url':'https://notification.url', //required,url on which you wants to receive notification,
    'name':'',//optional,
    'currency':'usd',//optional,
    'suceess_url':'https://success.url',//optional,
    'fail_url':'https://fail.url',//optional,
    'description':'',//optional.
}

invoice  = obj.createInvoice(param);
```

success response : 
```
{
  "flag": 1,
  "msg": "Invoice successfully created !!!",
  "action": "create-invoice",
  "data": {
    "id": "5e47cc7c33d3c37a2b0410a2",
    "invoice_id": "BTC646",
    "merchant_id": "5bc46fb28ebb8363d2657347",
    "url": "http://192.168.0.102/coinremitter/public/invoice/5e47cc7c33d3c37a2b0410a2",
    "total_amount": {
      "BTC": 0.01257558,
      "USD": 123
    },
    "paid_amount": [],
    "usd_amount": 123,
    "conversion_rate": {
      "USD_BTC": 0.00010224,
      "BTC_USD": 9780.86
    },
    "base_currency": "USD",
    "coin": "BTC",
    "name": "avc",
    "description": "",
    "wallet_name": "wp-withd",
    "address": "QNBAmyqiMwskJZ6sY4WMzTF5ziQoVj5W9Y",
    "status": "Pending",
    "status_code": 0,
    "suceess_url": "https://success.url",
    "fail_url": "https://fail.url",
    "notify_url": "",
    "expire_on": false,
    "invoice_date": "2020-02-15 16:18:28",
    "last_updated_date": "2020-02-15 16:18:28"
  }
}

```

### Get Invoice
get invoice detail using invoice_id received using following method :
```
param = {
    'invoice_id':'BTC646'
}

invoice = obj.getInvoice(param);
```
success response : 
```
{
  "flag": 1,
  "msg": "success",
  "action": "get-invoice",
  "data": {
    "id": "5e47cc7c33d3c37a2b0410a2",
    "invoice_id": "BTC646",
    "merchant_id": "5bc46fb28ebb8363d2657347",
    "url": "http://192.168.0.102/coinremitter/public/invoice/5e47cc7c33d3c37a2b0410a2",
    "total_amount": {
      "BTC": 0.01257558,
      "USD": 123
    },
    "paid_amount": [],
    "usd_amount": 123,
    "conversion_rate": {
      "USD_BTC": 0.00010224,
      "BTC_USD": 9780.86
    },
    "base_currency": "USD",
    "coin": "BTC",
    "name": "avc",
    "description": "",
    "wallet_name": "wp-withd",
    "address": "QNBAmyqiMwskJZ6sY4WMzTF5ziQoVj5W9Y",
    "payment_history": [],
    "status": "Pending",
    "status_code": 0,
    "wallet": "wpwithd",
    "suceess_url": "https://success.url",
    "fail_url": "https://fail.url",
    "notify_url": "",
    "expire_on": false,
    "invoice_date": "2020-02-15 16:18:28",
    "last_updated_date": "2020-02-15 16:18:28"
  }
}
```

### Get Coin Rate
get coin rate using following method :
```
rate = obj.getCoinRate();
```
success response : 
```
{
  "flag": 1,
  "msg": "success",
  "action": "get-coin-rate",
  "data": {
    "BTC": {
      "symbol": "BTC",
      "name": "Bitcoin",
      "price": 9780.86
    },
    "LTC": {
      "symbol": "LTC",
      "name": "Litecoin",
      "price": 72.85
    },
    "BCH": {
      "symbol": "BCH",
      "name": "Bitcoin Cash",
      "price": 438.5
    },
    "XRP": {
      "symbol": "XRP",
      "name": "Ripple",
      "price": 0.26995
    },
    "USDT": {
      "symbol": "USDT",
      "name": "Tether",
      "price": 0.992122
    },
    "TCN": {
      "symbol": "TCN",
      "name": "Test Coin",
      "price": 47.09
    }
  }
}
```

**for further reference please visit our [api documentation](https://coinremitter.com/docs)**