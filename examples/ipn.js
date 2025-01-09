const express = require('express');
const multer = require('multer');
const upload = multer();
const app = express();
const Coinremitter = require('coinremitter-api');
                                                                
app.post('/coinremitter-webook', upload.none(), async function (req, res) {
    console.log("Webhook Data", req.body);

    if(!req.body.id){
        return res.send('No transaction data received');
    }

    const transactionId = req.body.id;

    const wallet = new Coinremitter('WALLET_API_KEY', 'WALLET_PASSWORD')
    const transaction = await wallet.getTransaction({id: transactionId})
    console.log("Transaction Data", transaction);

    // Write your business logic here

    res.send('Okey !!');
})

app.post('/coinremitter-notify', upload.none(), async function (req, res) {
    console.log("Notify Data", req.body);

    if(!req.body.invoice_id){
        return res.send('No invoice data received');
    }

    const invoiceId = req.body.invoice_id;

    const wallet = new Coinremitter('WALLET_API_KEY', 'WALLET_PASSWORD')
    const invoice = await wallet.getInvoice({id: invoiceId})
    console.log("Invoice Data", invoice);

    // Write your business logic here

    res.send('Okey !!');
})

console.log("Server Started. Waiting for webhook data...");
app.listen(3000);