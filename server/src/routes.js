const express = require('express');
const { userRouter } = require('../entities/users/route');

function routerApi(app){
    const router = express.Router();
    app.use('/api/v1', router);

    router.use('/users',userRouter)

    router.get('/', (req, res) => {
        res.json({
            messaje: "Hello main route"
        })
    })
}

module.exports = routerApi;