const Coinremitter = require('coinremitter-api');

// Get list of supported currenciens and their details and fees
async function getSupportCurrency() {
    const wallet = new Coinremitter();
    const supportedCurrency = await wallet.getSupportedCurrency();
    console.log("Supported currency : ", supportedCurrency)
};

// Get fiat to crypto rate conversion
async function getFiatToCryptoRate() {
    const wallet = new Coinremitter();
    const reqParam = {
        fiat: "USD",
        fiat_amount: 50.10,
        crypto : "BTC"  // optional
    }
    const cryptoRate = await wallet.getFiatToCryptoRate(reqParam);
    console.log("Fiat to crypto rate conversion : ", cryptoRate)
};

// Get crypto to fiat rate conversion
async function getCryptoToFiatRate() {
    const wallet = new Coinremitter();
    const reqParam = {
        crypto: "BTC",
        crypto_amount: 0.05,
        fiat : "USD" // optional
    }
    const fiatRate = await wallet.getCryptoToFiatRate(reqParam);
    console.log("Crypto to fiat rate conversion : ", fiatRate)
};

// Get wallet balance
async function getBalance() {
    const wallet = new Coinremitter(WALLET_API_KEY, WALLET_API_PASSWORD);
    const balance = await wallet.getBalance();
    console.log("Wallet balance : ", balance)
}

// Create new address for wallet
async function createAddress() {
    const wallet = new Coinremitter(WALLET_API_KEY, WALLET_API_PASSWORD);
    const reqParam = {
        label: "BTC1" // optional
    }
    const balance = await wallet.createAddress(reqParam);
    console.log("New address : ", balance)
}

// Check address is valid or not
async function validateAddress() {
    const wallet = new Coinremitter(WALLET_API_KEY, WALLET_API_PASSWORD);
    const reqParam = {
        address: "WALLET_ADDRESS"
    }
    const isValid = await wallet.validateAddress(reqParam);
    console.log("Validate address : ", isValid)
}

// Check address is valid or not
async function estimateWithdraw() {
    const wallet = new Coinremitter(WALLET_API_KEY, WALLET_API_PASSWORD);
    const reqParam = {
        amount: "0.05", 
        address: "WALLET_ADDRESS", // optional
        withdrawal_speed: "priority" // optional
    }
    const isValid = await wallet.estimateWithdraw(reqParam);
    console.log("Withdraw estimate : ", isValid)
}

// Withdraw wallet balance to external address
async function withdraw() {
    const wallet = new Coinremitter(WALLET_API_KEY, WALLET_API_PASSWORD);
    const reqParam = {
        amount: 0.01,
        address: "EXTERNAL_ADDRESS",
        withdrawal_speed: "priority" // optional
    }
    const withdraw = await wallet.withdraw(reqParam);
    console.log("Withdraw : ", withdraw)
}

// Get transaction details
async function getTransaction() {
    const wallet = new Coinremitter(WALLET_API_KEY, WALLET_API_PASSWORD);
    const reqParam = {
        id: 'TRANSACTION_ID',
    }
    const transaction = await wallet.getTransaction(reqParam);
    console.log("Transaction : ", transaction)
}

// Get transaction details by wallet address
async function getTransactionByAddress() {
    const wallet = new Coinremitter(WALLET_API_KEY, WALLET_API_PASSWORD);
    const reqParam = {
        address: 'WALLET_ADDRESS',
    }
    const addressTransaction = await wallet.getTransactionByAddress(reqParam);
    console.log("Transaction by address : ", addressTransaction)
}

// Create new invoice
async function createInvoice() {
    const wallet = new Coinremitter(WALLET_API_KEY, WALLET_API_PASSWORD);
    const reqParam = {
        amount: 1,
        name: 'Jyorge', // optional
        email: 'jyorge@outlook.com', // optional
        fiat_currency: 'USD', // optional
        expiry_time_in_minutes: 10, // optional
        notify_url: '', // optional
        success_url: '', // optional
        fail_url: '', // optional
        description: 'Order 100', // optional
        custom_data1: 'Custom data', // optional
        custom_data2: 'Custom data', // optional
    }
    const newInvoice = await wallet.createInvoice(reqParam);
    console.log("Create Invoice : ", newInvoice)
}

// Get invoice details
async function getInvoice() {
    const wallet = new Coinremitter(WALLET_API_KEY, WALLET_API_PASSWORD);
    const reqParam = {
        invoice_id: "INVOICE_ID"
    }
    const invoice = await wallet.getInvoice(reqParam);
    console.log("Invoice : ", invoice)
}
