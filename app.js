const express = require('express');
const errorMiddleware = require('./src/middlewares/error');
const productRoute = require('./src/routes/productUpdate');
const app = express();


app.use('/webhooks/products', productRoute);



// Error Middleware
app.use(errorMiddleware);
module.exports = app;