/**
 *
 * @api_key string 
 * wallet api key
 */
const api_key = '';

/**
 *
 * @api_password string
 * wallet api password
 */
const api_password = '';

/**
 *
 * @version string
 * Version of API
 */
const version = 'v1';

/**
*
* @url string
* API base url
*/
const url = 'https://api.coinremitter.com/';

/**
*
* @plugin_version string 
* version of plugin
*/
const plugin_version = '1.1.1';

/**
*
* @user_agent string 
* user agent
*/
const user_agent = 'CR@' + version + ',node plugin@' + plugin_version;
/**
 * Coinremitter Class
 *
 * Provides functionality to manage cryptocurrency operations such as checking wallet balances, 
 * making deposits and withdrawals, creating and retrieving invoices, and checking transactions.
 */
class Coinremitter {

    /**
     * Constructs the Coinremitter instance with API credentials.
     *
     * @param {string} api_key - Your API key.
     * @param {string} password - Your API password.
     * ```
     * const wallet = new Coinremitter('WALLET_API_KEY','WALLET_PASSWORD');
     * ```
     * 
     */
    constructor(api_key = '', password = '') {
        this.api_key = api_key;
        this.api_password = password;
    }

    /**
     * Creates a new wallet address.
     *
     * @param {Object} param - Request parameters.
     * @param {string} param.label - (optional) A label to assign to the new address.
     * @param {function} callback - Callback function to handle the response (error, data).
     * 
     * @return {Object} Response object of create address.
     * @return {boolean}`success` - Indicates if the address was created successfully or not.
     * 
     * Response contains the following data if sucess is **TRUE**:
     * @return {Object} `data` - Contains the details of the created address.
     * @return {string} `data.wallet_id` - Unique identifier for the wallet.
     * @return {string} `data.wallet_name` - Name of the wallet associated with the address.
     * @return {string} `data.coin` - Name of the cryptocurrency (e.g., Ethereum).
     * @return {string} `data.coin_symbol` - Symbol of the cryptocurrency (e.g., ETH).
     * @return {string} `data.coin_logo` - Coin logo url.
     * @return {string} `data.blockchain_network_name` - Blockchain network name.
     * @return {string} `data.contract_address` - Contract address of token.
     * @return {string} `data.contract_address_url` - Explorer url of contract address.
     * @return {string} `data.chain_id` - Blockchain id for EVM coins.
     * @return {string} `data.address` - The newly created wallet address.
     * @return {string} `data.explorer_url` - Third party explorer URL where the address can be cross-checked.
     * @return {string} `data.label` - Label associated with the address.
     * @return {string} `data.qr_code` - URL to the QR code representing the wallet address.
     * @return {string} `data.minimum_deposit_amount` - Minimum deposite amount for coin.Below this amount transaction is not accepted.
     * @return {string} `data.remaining_address_limit` - It indicates remaining address limit for the wallet. If the value is -1, means you have pro plan and you can create unlimited addresses from this wallet.
     * @return {string} `data.wrn_msg` - This warning message should display to the user.
     * @return {string} `data.expire_on` - Expiry date of address.
     * @return {integer} `data.expire_on_timestamp` - Timestamp of expiry time.
     * 
     * Response contains the following data if sucess is **FALSE**:
     * @return {string} `error` - Error type.
     * @return {integer} `error_code` - Error code.
     * @return {string} `msg` - Descriptive error message.
     */
    async createAddress(param = {}, callback) {
        try {
            const data = await this.#apiPostCall('/wallet/address/create', param, callback);
            return data;
        } catch (error) {
            return error;
        }
    }

    /**
     * Validates a given wallet address.
     *
     * @param {Object} param - Request parameters.
     * @param {string} param.address - The wallet address to validate (required).
     * @param {function} callback - Callback function to handle the response (error, data).
     * 
     * ```
     * const validAddr = await wallet.validateAddress({"address":'bc1qk6sh8azwp0nyfdv47hnye3he7q4z8ffz3ppvza'});
     * ```
     * 
     * @return {Object} Response object of validate address.
     * Response contains the following data if sucess is **TRUE**:
     * @return {boolean} `success` - Indicates if the validation request was successful.
     * @return {Object} `data` - Contains the validation result.
     * @return {boolean} `data.valid` - Indicates if the wallet address is valid (true) or invalid (false).
     * 
     * Response contains the following data if sucess is **FALSE**:
     * @return {string} `error` - Error type.
     * @return {integer} `error_code` - Error code.
     * @return {string} `msg` - Descriptive error message.
     */
    async validateAddress(param, callback) {
        try {
            const data = await this.#apiPostCall('/wallet/address/validate', param, callback);
            return data;
        } catch (error) {
            return error;
        }
    }

    /**
     * Estimate the cost of withdraw an amount.
     *
     * @param {Object} param - Request parameters.
     * @param {string} param.amount - Total amount which you want to send. (required).
     * @param {string} param.address - Address of in which you want to send amount (optional).
     * @param {string} param.withdrawal_speed - The speed of withdrawal. Either 'priority', 'medium' or 'low'.Default speed take from your wallet settings (optional).
     * @param {function} callback - Callback function to handle the response (error, data).
     * 
     * ```
     * const validAddr = await wallet.validateAddress({"address":'bc1qk6sh8azwp0nyfdv47hnye3he7q4z8ffz3ppvza'});
     * ```
     * 
     * @return {Object} Response object of validate address.
     * Response contains the following data if sucess is **TRUE**:
     * @return {boolean} `success` - Indicates if the validation request was successful.
     * @return {Object} `data` - Contains the validation result.
     * @return {string} `data.amount` - Amount want to send.
     * @return {string} `data.transaction_fee` - Transactions fee for given amount.
     * @return {string} `data.processing_fee` - Processing fee for given amount.
     * @return {string} `data.total_amount` - transaction_fee+processing_fee+amount. Amount to be deducted from wallet.
     * @return {object} `data.fees_structure` - Fee structure.
     * 
     * Response contains the following data if sucess is **FALSE**:
     * @return {string} `error` - Error type.
     * @return {integer} `error_code` - Error code.
     * @return {string} `msg` - Descriptive error message.
     */
    async estimateWithdraw(param, callback) {
        try {
            const data = await this.#apiPostCall('/wallet/withdraw/estimate', param, callback);
            return data;
        } catch (error) {
            return error;
        }
    }

    /**
     * Withdraw an amount from wallet.
     *
     * @param {Object} param - Request parameters.
     * @param {string} param.address - Recipient's wallet address (required).
     * @param {integer} param.amount - Amount to transfer (required).
     * @param {integer} param.withdrawal_speed - The speed of withdrawal. Either 'priority', 'medium' or 'low'.Default speed take from your wallet settings (optional).
     * @param {function} callback - Callback function to handle the response (error, data).
     *
     * ```
     * const transaction = await wallet.withdraw({"amount":'0.1','address':'bc1qk6sh8azwp0nyfdv47hnye3he7q4z8ffz3ppvza'});
     * ```
     * 
     * @return {Object} Response object of withdrawal.
     * @return {boolean}`success` - Indicates if the withdrawal done successfully or not.
     * 
     * Response contains the following data if sucess is **TRUE**:
     * @return {Object} `data` - Contains details of the withdrawal transaction.
     * @return {string} `data.id` - Unique identifier for the withdrawal transaction.
     * @return {string} `data.txid` - Transaction ID of the withdrawal.
     * @return {string} `data.explorer_url` - URL to view the transaction on the blockchain explorer.
     * @return {string} `data.amount` - Amount withdrawn.
     * @return {string} `data.transaction_fees` - Fees associated with the transaction.
     * @return {string} `data.processing_fees` - Processing fees for the withdrawal.
     * @return {string} `data.total_amount` - Total amount debited from the wallet.
     * @return {string} `data.to_address` - The address to which funds were sent.
     * @return {string} `data.wallet_id` - ID of the wallet from which funds were withdrawn.
     * @return {string} `data.wallet_name` - Name of the wallet from which funds were withdrawn.
     * @return {string} `data.coin_symbol` - Symbol of the cryptocurrency (e.g., TRX).
     * @return {string} `data.coin` - Name of the cryptocurrency (e.g., Tron).
     * @return {string} `data.date` - Date and time of the withdrawal.
     * @return {integer} `data.transaction_timestamp` - Timestamp of the transaction in milliseconds.
     * @return {string} `data.remaining_withdraw_limit_24h` - Remaining withdrawal limit for the next 24 hours.
     * 
     * Response contains the following data if sucess is **FALSE**:
     * @return {string} `error` - Error type.
     * @return {integer} `error_code` - Error code.
     * @return {string} `msg` - Descriptive error message.
     * 
     */
    async withdraw(param, callback) {
        try {
            const data = await this.#apiPostCall('/wallet/withdraw', param, callback);
            return data;
        } catch (error) {
            return error;
        }
    }

    /**
     * Get transaction details by transaction id.
     *
     * @param {Object} param - Request parameters.
     * @param {string} param.id - Unique id of your transaction. It is not blockchain transaction id. you will get this id from webhook data (required).
     * @param {function} callback - Callback function to handle the response (error, data).
     * 
     * @return {Object} Response object of get transaction.
     * @return {boolean} success - Indicates if transaction detail get successfully or not.
     * 
     * Response contains the following data if sucess is **TRUE**:
     * @return {Object} `data` - Contains details of the transaction.
     * @return {string} `data.id` - Unique identifier for the transaction.
     * @return {string} `data.txid` - Blockchain transaction id.
     * @return {string} `data.explorer_url` - Third party explorer URL where the transaction status can be cross-checked.
     * @return {string} `data.type` - Type of transaction. Either 'receive' or 'send'.
     * @return {string} `data.status` - Status of transaction. Either 'confirm' or 'pending'.
     * @return {integer} `data.status_code` - Status code of transaction. Either 1 for 'confirm' or 0 for 'pending'.
     * @return {string} `data.coin` - Coin full name. E.g. Bitcoin.
     * @return {string} `data.coin_symbol` - Symbol of coin. E.g. BTC for Bitcoin.
     * @return {string} `data.wallet_id` - Unique ID of wallet.
     * @return {string} `data.wallet_name` - Name of the wallet.
     * @return {string} `data.address` - It is address where Coins/Tokens is sent or received.
     * @return {string} `data.label` - Label of the address.
     * @return {string} `data.amount` - Amount of transactions that are sent / received.
     * @return {integer} `data.confirmations` - Number of confirmation from the blockchain transaction.
     * @return {integer} `data.required_confirmations` - At least this number of confirmations is required to confirm the transaction.
     * @return {string} `data.date` - Date and time of transaction.
     * @return {integer} `data.transaction_timestamp` - Timestamp of the transaction in milliseconds.
     * 
     * Response contains the following data if sucess is **FALSE**:
     * @return {string} `error` - Error type.
     * @return {integer} `error_code` - Error code.
     * @return {string} `msg` - Descriptive error message.
     * 
     */
    async getTransaction(param, callback) {
        try {
            const data = await this.#apiPostCall('/wallet/transaction', param, callback);
            return data;
        } catch (error) {
            return error;
        }
    }

    /**
     * Retrieves transaction details for a specified wallet address.
     *
     * @param {Object} param - Request parameters.
     * @param {string} param.address - The wallet address (required).
     * @param {function} callback - Callback function to handle the response (error, data).
     * 
     * @return {Object} Response object of transaction by address.
     * @return {boolean}`success` - Indicates if the transaction details get successfully or not.
     * 
     * Response contains the following data if sucess is **TRUE**:
     * @return {Object} `data` - Contains details of the wallet and transactions.
     * @return {string} `data.coin` - Coin full name. E.g. Bitcoin.
     * @return {string} `data.coin_symbol` - Symbol of coin. E.g. BTC for Bitcoin.
     * @return {string} `data.wallet_id` - Unique ID of wallet.
     * @return {string} `data.wallet_name` - Name of the wallet.
     * @return {string} `data.address` - It is address where Coins/Tokens is sent or received.
     * @return {string} `data.label` - Label of the address.
     * @return {string} `data.expire_on` - Expiration date and time of the address.
     * @return {integer} `data.expire_on_timestamp` - Timestamp of expiration in milliseconds.
     * @return {integer} `data.required_confirmations` - At least this number of confirmations is required to confirm the transaction.
     * @return {integer} `data.confirm_amount` - Total confirm amount of address.
     * @return {integer} `data.pending_amount` - Total unconfirm amount of address.
     * @return {Array<Object>} `data.transactions` - List of transactions associated with the wallet address.
     * @return {Object} `data.transactions[].id` - Unique id of transaction.
     * @return {string} `data.transactions[].txid` - Blockchain transaction id.
     * @return {string} `data.transactions[].explorer_url` - Third party explorer URL where the transaction status can be cross-checked.
     * @return {string} `data.transactions[].type` - Type of transaction. Either 'receive' or 'send'.
     * @return {string} `data.transactions[].amount` - Amount of transactions that are sent / received.
     * @return {string} `data.transactions[].confirm_amount` - Confirm amount of address.
     * @return {string} `data.transactions[].pending_amount` - Unconfirm amount of address.
     * @return {integer} `data.transactions[].confirmations` - Number of confirmation from the blockchain transaction.
     * @return {string} `data.transactions[].status` - Status of transaction. Either 'confirm' or 'pending'.
     * @return {string} `data.transactions[].status_code` - Status code of transaction. Either 1 for 'confirm' or 0 for 'pending'.
     * @return {string} `data.transactions[].date` - Date and time of transaction.
     * @return {integer} `data.transactions[].transaction_timestamp` - Timestamp of transaction created.
     * 
     * Response contains the following data if sucess is **FALSE**:
     * @return {string} `error` - Error type.
     * @return {integer} `error_code` - Error code.
     * @return {string} `msg` - Descriptive error message.
     * 
     */
    async getTransactionByAddress(param, callback) {
        try {
            const data = await this.#apiPostCall('/wallet/address/transactions', param, callback);
            return data;
        } catch (error) {
            return error;
        }
    }

    /**
     * Get wallet balance.
     *
     * @param {function} callback - Callback function to handle the response (error, data).
     * 
     * @return {Object} Response object of get wallet balance.
     * @return {boolean}`success` - Indicates if the wallet balance get successfully or not.
     * 
     * Response contains the following data if sucess is **TRUE**:
     * @return {Object} `data` - Contains details of the wallet balance.
     * @return {string} `data.wallet_id` - Wallet id.
     * @return {string} `data.wallet_name` - Wallet name.
     * @return {string} `data.coin` - Coin full name. E.g. Bitcoin.
     * @return {string} `data.coin_symbol` - Symbol of coin. E.g. BTC for Bitcoin.
     * @return {string} `data.coin_logo` - Coin logo url.
     * @return {string} `data.blockchain_network_name` - Blockchain network name.
     * @return {string} `data.contract_address` - Contract address of token.
     * @return {string} `data.contract_address_url` - Explorer url of contract address.
     * @return {string} `data.chain_id` - Blockchain id for EVM coins.
     * @return {string} `data.explorer_url` - Third party explorer URL where the address can be cross-checked.
     * @return {string} `data.minimum_deposit_amount` - Minimum deposite amount for coin.Below this amount transaction is not accepted.
     * @return {string} `data.remaining_withdraw_limit_24h` - Remaining wallet widhrawal limit for 24 hour.
     * @return {string} `data.balance` - Total balance available in a wallet.
     * 
     * Response contains the following data if sucess is **FALSE**:
     * @return {string} `error` - Error type.
     * @return {integer} `error_code` - Error code.
     * @return {string} `msg` - Descriptive error message.
     */
    async getBalance(callback) {
        try {
            const data = await this.#apiPostCall('/wallet/balance', {}, callback);
            return data;
        } catch (error) {
            return error;
        }
    }

    /**
     * Creates a new invoice.
     *
     * @param {Object} param - Invoice parameters.
     * @param {integer} param.amount - Invoice amount (required).
     * @param {string} param.name - It will display on invoice. Max 30 characters. It will display wallet name if this name is empty (optional).
     * @param {string} param.email - Send invoice on this email. (optional).
     * @param {string} param.fiat_currency - Fiat currency code. E.g. USD, INR, EUR etc. (e.g., INR, USD) (optional).
     * @param {integer} param.expiry_time_in_minutes - Invoice expiry time in minutes. Default 1440 minutes (optional).
     * @param {string} param.notify_url - URL on which you will be notify about payment (optional).
     * @param {string} param.success_url - User will be redirected to this url once payment done (optional).
     * @param {string} param.fail_url - User will be redirected to this url when user cancel payment (optional).
     * @param {string} param.description - The description for the invoice (optional).
     * @param {string} param.custom_data1 - This data will be included in notify_url. Max 30 characters (optional).
     * @param {string} param.custom_data2 - This data will be included in notify_url. Max 30 characters (optional).
     * @param {function} callback - Callback function to handle the response (error, data).
     * 
     * 
     * @return {Object} Response object of create invoice.
     * @return {boolean}`success` - Indicates if the invoice was created successfully or not.
     * 
     * Response contains the following data if sucess is **TRUE**:
     * @return {Object} `data` - Contains the details of the created invoice.
     * @return {string} `data.id` - Unique ID of Invoice.
     * @return {string} `data.invoice_id` - ID of the invoice.
     * @return {string} `data.url` - Public URL of invoice.
     * @return {Object} `data.total_amount` - Total Amount in fiat/cryptocurrency.
     * @return {Object} `data.paid_amount` - Paid amount in fiat/cryptocurrency.
     * @return {string} `data.amount` - Invoice amount in crypto currency.
     * @return {string} `data.usd_amount` - Total invoice amount in USD.
     * @return {Object} `data.conversion_rate` - Rate of conversion when invoice created.
     * @return {string} `data.fiat_currency` - Fiat currency code. E.g. USD, INR, EUR etc.
     * @return {string} `data.coin` - Coin full name. E.g. Bitcoin.
     * @return {string} `data.coin_symbol` - Symbol of coin. E.g. BTC for Bitcoin.
     * @return {string} `data.name` - Name of the invoice.
     * @return {string} `data.description` - Description of the invoice.
     * @return {string} `data.wallet_id` - Wallet id.
     * @return {string} `data.wallet_name` - Wallet name.
     * @return {string} `data.merchant_id` - Merchant id.
     * @return {string} `data.status` - Status of invoice. Either 'Pending', 'Paid', 'Under Paid', 'Over Paid', 'Expired' or 'Cancelled'.
     * @return {integer} `data.status_code` - Status code of invoice. Either 0 for 'Pending', 1 for 'Paid', 2 for 'Under Paid', 3 for 'Over Paid', 4 for 'Expired' or 5 for 'Cancelled'.
     * @return {Object} `data.payment_history` - Transaction list of invoice.
     * @return {string} `data.notify_url` - URL on which you will be notify about payment.
     * @return {string} `data.success_url` - User will be redirected to this url once payment done.
     * @return {string} `data.fail_url` - User will be redirected to this url when user cancel payment.
     * @return {string} `data.expire_on` - Expiry date of invoice in UTC.
     * @return {string} `data.expire_on_timestamp` - Timestamp of expiry time.
     * @return {string} `data.invoice_date` - Invoice created date in UTC.
     * @return {integer} `data.invoice_timestamp` - Timestamp of invoice created date.
     * @return {string} `data.delete_after` - The invoice is valid for 365 days from the date of creation and will be automatically deleted after this period. Ensure no coins or tokens are sent to the invoice address once it has been deleted.
     * @return {integer} `data.delete_after_timestamp` - Timestamp of delete_after date.
     * @return {string} `data.custom_data1` - Custom data 1 set by you.
     * @return {string} `data.custom_data2` - Custom data 2 set by you.
     * 
     * Response contains the following data if sucess is **FALSE**:
     * @return {string} `error` - Error type.
     * @return {integer} `error_code` - Error code.
     * @return {string} `msg` - Descriptive error message.
     * 
     */
    async createInvoice(param, callback) {
        try {
            const data = await this.#apiPostCall('/invoice/create', param, callback);
            return data;
        } catch (error) {
            return error;
        }
    }

    /**
     * Retrieves an existing invoice by its ID.
     *
     * @param {Object} param - Request parameters.
     * @param {string} param.invoice_id - The invoice ID from createInvoice response (required).
     * @param {function} callback - Callback function to handle the response (error, data).
     * 
     * ```
     * const invoice = await wallet.getInvoice({ "invoice_id": 'kyS4tP8' });
     * ```
     * 
     * @return {Object} Response object of get invoice.
     * @return {boolean}`success` - Indicates if the invoice data get successfully or not.
     * 
     * Response contains the following data if sucess is **TRUE**:
     * @return {Object} `data` - Contains the details of the created invoice.
     * @return {string} `data.id` - Unique ID of Invoice.
     * @return {string} `data.invoice_id` - ID of the invoice.
     * @return {string} `data.url` - Public URL of invoice.
     * @return {Object} `data.total_amount` - Total Amount in fiat/cryptocurrency.
     * @return {Object} `data.paid_amount` - Paid amount in fiat/cryptocurrency.
     * @return {string} `data.amount` - Invoice amount in crypto currency.
     * @return {string} `data.usd_amount` - Total invoice amount in USD.
     * @return {Object} `data.conversion_rate` - Rate of conversion when invoice created.
     * @return {string} `data.fiat_currency` - Fiat currency code. E.g. USD, INR, EUR etc.
     * @return {string} `data.coin` - Coin full name. E.g. Bitcoin.
     * @return {string} `data.coin_symbol` - Symbol of coin. E.g. BTC for Bitcoin.
     * @return {string} `data.name` - Name of the invoice.
     * @return {string} `data.description` - Description of the invoice.
     * @return {string} `data.wallet_id` - Wallet id.
     * @return {string} `data.wallet_name` - Wallet name.
     * @return {string} `data.merchant_id` - Merchant id.
     * @return {string} `data.status` - Status of invoice. Either 'Pending', 'Paid', 'Under Paid', 'Over Paid', 'Expired' or 'Cancelled'.
     * @return {integer} `data.status_code` - Status code of invoice. Either 0 for 'Pending', 1 for 'Paid', 2 for 'Under Paid', 3 for 'Over Paid', 4 for 'Expired' or 5 for 'Cancelled'.
     * @return {Object} `data.payment_history` - Transaction list of invoice.
     * @return {string} `data.notify_url` - URL on which you will be notify about payment.
     * @return {string} `data.success_url` - User will be redirected to this url once payment done.
     * @return {string} `data.fail_url` - User will be redirected to this url when user cancel payment.
     * @return {string} `data.expire_on` - Expiry date of invoice in UTC.
     * @return {string} `data.expire_on_timestamp` - Timestamp of expiry time.
     * @return {string} `data.invoice_date` - Invoice created date in UTC.
     * @return {integer} `data.invoice_timestamp` - Timestamp of invoice created date.
     * @return {string} `data.delete_after` - The invoice is valid for 365 days from the date of creation and will be automatically deleted after this period. Ensure no coins or tokens are sent to the invoice address once it has been deleted.
     * @return {integer} `data.delete_after_timestamp` - Timestamp of delete_after date.
     * @return {string} `data.custom_data1` - Custom data 1 set by you.
     * @return {string} `data.custom_data2` - Custom data 2 set by you.
     * 
     * Response contains the following data if sucess is **FALSE**:
     * @return {string} `error` - Error type.
     * @return {integer} `error_code` - Error code.
     * @return {string} `msg` - Descriptive error message.
     * 
     */
    async getInvoice(param, callback) {
        try {
            const data = await this.#apiPostCall('/invoice/get', param, callback);
            return data;
        } catch (error) {
            return error;
        }
    }

    /**
     * Retrieves exchange rates for fiat currencies in terms of cryptocurrencies.
     *
     * @param {Object} param - Request parameters.
     * @param {string} param.fiat - Fiat currency symbol (required).
     * @param {string} param.fiat_amount - Amount of fiat to convert (required).
     * @param {string} param.crypto - Specific cryptocurrency to convert to (optional).
     * @param {function} callback - Callback function to handle the response (error, data).
     * 
     * ```
     * const fiatTocryptoRate = await wallet.getFiatToCryptoRate({"fiat":"USD","fiat_amount":222.2});
     * ```
     * 
     * @return {Object} Response object of fiat to crypto rate conversion.
     * @return {boolean}`success` - Indicates if the crypto rate conversion get successfully or not.
     * 
     * Response contains the following data if sucess is **TRUE**:
     * @return {Array<Object>} `data` - An array of cryptocurrency exchange rates.
     * @return {Object} `data[].short_name` - The short name of the cryptocurrency (e.g., BTC).
     * @return {string} `data[].name` - The full name of the cryptocurrency (e.g., Bitcoin).
     * @return {string} `data[].price` - The current price of the cryptocurrency in terms of the specified fiat currency.
     * 
     * Response contains the following data if sucess is **FALSE**:
     * @return {string} `error` - Error type.
     * @return {integer} `error_code` - Error code.
     * @return {string} `msg` - Descriptive error message.
     * 
     */
    async getFiatToCryptoRate(param, callback) {
        try {
            const data = await this.#apiPostCall('/rate/fiat-to-crypto', param, callback);
            return data;
        } catch (error) {
            return error;
        }
    }

    /**
     * Retrieves exchange rates for cryptocurrencies in terms of fiat currencies.
     *
     * @param {Object} param - Request parameters.
     * @param {string} param.crypto - Cryptocurrency symbol to convert (required).
     * @param {integer} param.crypto_amount - Amount of cryptocurrency to convert (required).
     * @param {string} param.fiat - specific fiat currency to convert to (optional).
     * @param {function} callback - Callback function to handle the response (error, data).
     * 
     * ```
     * const fiatRate = await wallet.getCryptoToFiatRate({"crypto":"BTC","crypto_amount":0.1,"fiat":"USD"});
     * ```
     * @return {Object} Response object of fiat to crypto rate conversion.
     * @return {boolean}`success` - Indicates if the crypto rate conversion get successfully or not.
     * 
     * Response contains the following data if sucess is **TRUE**:
     * @return {Array<Object>} `data` - An array of fiat currency exchange rates.
     * @return {string} `data[].code` - The currency code (e.g., USD).
     * @return {string} `data[].currency` - The full name of the currency (e.g., United States Dollar).
     * @return {string} `data[].amount` - The current amount of fiat currency equivalent to the specified cryptocurrency.
     * 
     * Response contains the following data if sucess is **FALSE**:
     * @return {string} `error` - Error type.
     * @return {integer} `error_code` - Error code.
     * @return {string} `msg` - Descriptive error message.
     * 
     */
    async getCryptoToFiatRate(param, callback) {
        try {
            const data = await this.#apiPostCall('/rate/crypto-to-fiat', param, callback);
            return data;
        } catch (error) {
            return error;
        }
    }

    /**
     * Retrieves a list of all supported currencies.
     *
     * @param {function} callback - Callback function to handle the response (error, data).
     * 
     * @return {Object} Response object of supported currency.
     * @return {boolean}`success` - Indicates if supported currency get successfully or not.
     * 
     * Response contains the following data if sucess is **TRUE**:
     * @return {Array<Object>} `data` - An array of supported currencies.
     * @return {string} `data[].coin` - The name of the cryptocurrency (e.g., Zano).
     * @return {string} `data[].coin_symbol` - The symbol of the cryptocurrency (e.g., ZANO).
     * @return {string} `data[].network_name` - The name of the network (e.g., Zano Network).
     * @return {string} `data[].explorer_url` - The URL to the blockchain explorer for the cryptocurrency.
     * @return {string} `data[].logo` - The URL of the cryptocurrency logo.
     * @return {string} `data[].minimum_deposit_amount` - The minimum deposit amount for the cryptocurrency.
     * @return {string} `data[].price_in_usd` - The current price of the cryptocurrency in USD.
     * @return {Object} `data[].fees` - An object containing fee structures.
     * @return {Object} `data[].fees.low` - Fee structure for low priority transactions.
     * @return {string} `data[].fees.low.transaction_fees_type` - Type of transaction fees (e.g., flat or percentage).
     * @return {string} `data[].fees.low.processing_fees_type` - Type of processing fees (e.g., flat or percentage).
     * @return {string} `data[].fees.low.transaction_fee` - The transaction fee amount for low priority.
     * @return {string} `data[].fees.low.processing_fee` - The processing fee amount for low priority.
     * @return {string} `data[].fees.low.transaction_fee_with_gasstation` - Transaction fee with gas station for low priority.
     * @return {string} `data[].fees.low.processing_fee_with_gasstation` - Processing fee with gas station for low priority.
     * @return {Object} `data[].fees.medium`- Fee structure for medium priority transactions.
     * @return {string} `data[].fees.medium.transaction_fees_type` - Type of transaction fees (e.g., flat or percentage).
     * @return {string} `data[].fees.medium.processing_fees_type` - Type of processing fees (e.g., flat or percentage).
     * @return {string} `data[].fees.medium.transaction_fee` - The transaction fee amount for low priority.
     * @return {string} `data[].fees.medium.processing_fee` - The processing fee amount for low priority.
     * @return {string} `data[].fees.medium.transaction_fee_with_gasstation` - Transaction fee with gas station for low priority.
     * @return {string} `data[].fees.medium.processing_fee_with_gasstation` - Processing fee with gas station for low priority.
     * @return {Object} `data[].fees.priority` - Fee structure for priority transactions.
     * @return {string} `data[].fees.priority.transaction_fees_type` - Type of transaction fees (e.g., flat or percentage).
     * @return {string} `data[].fees.priority.processing_fees_type` - Type of processing fees (e.g., flat or percentage).
     * @return {string} `data[].fees.priority.transaction_fee` - The transaction fee amount for low priority.
     * @return {string} `data[].fees.priority.processing_fee` - The processing fee amount for low priority.
     * @return {string} `data[].fees.priority.transaction_fee_with_gasstation` - Transaction fee with gas station for low priority.
     * @return {string} `data[].fees.priority.processing_fee_with_gasstation` - Processing fee with gas station for low priority.
     * 
     * Response contains the following data if sucess is **FALSE**:
     * @return {string} `error` - Error type.
     * @return {integer} `error_code` - Error code.
     * @return {string} `msg` - Descriptive error message.
     */
    async getSupportedCurrency(callback) {
        try {
            const data = await this.#apiPostCall('/rate/supported-currency', {}, callback);
            return data;
        } catch (error) {
            return error;
        }
    }

    /**
     * Makes a POST request to the specified API endpoint.
     *
     * @param {string} api_name - The API endpoint to call.
     * @param {Object} param - Optional parameters for the request.
     * @param {function} callback - Optional callback function to handle the response (error, data).
     * 
     * @return {Object} - A promise that resolves to the response data.
     */
    async #apiPostCall(api_name, param = {}, callback) {
        try {
            const apiUrl = url + version + api_name;
            console.log(apiUrl);
            const options = {
                method: 'POST',
                headers: {
                    'User-Agent': user_agent,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(param),
            }

            if (!['/rate/supported-currency', '/rate/crypto-to-fiat', '/rate/fiat-to-crypto'].includes(api_name)) {
                options.headers['x-api-key'] = this.api_key;
                options.headers['x-api-password'] = this.api_password;
            }

            return fetch(apiUrl, options)
                .then(response => {
                    return response.json(); // Parse JSON response
                })
                .then(data => {
                    if (callback) { // If a callback is provided, call it with the data
                        callback(null, data);
                    } else {
                        return data; // Otherwise, return the data for async/await
                    }
                })
                .catch((error) => {
                    throw new Error(error.message);
                });
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = Coinremitter;