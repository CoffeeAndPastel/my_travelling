const express = require('express');
const { agencyRouter } = require('../entities/agencies/route');
const { customerRouter } = require('../entities/customers/route');
const { driverRouter } = require('../entities/drivers/route');

function routerApi(app){
    const router = express.Router();
    app.use('/api/v1', router);

    router.use('/customers',customerRouter)
    router.use('/drivers',driverRouter)
    router.use('/agencies',agencyRouter)

    router.get('/', (req, res) => {
        res.json({
            messaje: "Hello main route"
        })
    })
}

module.exports = routerApi;