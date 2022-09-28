const express = require('express')

function routerApi(app){
    //Root route
    const router = express.Router();
    app.use('/api/v1', router);
    //Routes
    router.get('/', (req, res) => {
        res.json({
            messaje: "Hello main route"
        })
    })
    router.get('/example', (req, res) => {
        res.json({
            messaje: "Hello example route"
        })
    })
    // router.use('/example', );
}

module.exports = routerApi;