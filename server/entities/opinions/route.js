const express = require('express');
const { customerOpinionRouter } = require('../customers_opinions/route');
const { driverOpinionRouter } = require('../drivers_opinions/route');
const opinionRoute = express.Router();

opinionRoute.get('/',(req, res) => {
    res.json({
        message: "Hello opinions route"
    })
})

opinionRoute.use('/drivers',driverOpinionRouter);
opinionRoute.use('/customers',customerOpinionRouter);


module.exports = {opinionRoute}