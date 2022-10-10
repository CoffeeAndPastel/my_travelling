const express = require('express');
const { customerRouter } = require('../entities/customers/route');
const { driverRouter } = require('../entities/drivers/route');

function routerApi(app){
    const router = express.Router();
    app.use('/api/v1', router);

    router.use('/customers',customerRouter)
    router.use('/drivers',driverRouter)

    router.get('/', (req, res) => {
        res.json({
            messaje: "Hello main route"
        })
    })
}

module.exports = routerApi;