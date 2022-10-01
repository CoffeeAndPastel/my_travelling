const express = require('express');
const { customerRouter } = require('../entities/customers/route');
const { userRouter } = require('../entities/users/route');

function routerApi(app){
    const router = express.Router();
    app.use('/api/v1', router);

    router.use('/users',userRouter)
    router.use('/customers',customerRouter)

    router.get('/', (req, res) => {
        res.json({
            messaje: "Hello main route"
        })
    })
}

module.exports = routerApi;