const express = require('express');
const { autorizationHandler } = require('../../middlewares/auth');
const validatorHandler = require('../../middlewares/validator');
const {createCustomerOpinionSchema, updateCustomerOpinionSchema, getCustomerOpinionSchema} = require('./schema');
const CustomersOpinionsService = require('./service');
const customerOpinionRouter = express.Router();
const service = new CustomersOpinionsService;

customerOpinionRouter.get('/',
    async (req, res, next) => {
        try{
            const customersOpinions = await service.find();
            res.json(customersOpinions)
        }catch(error){
            next(error)
        }
    }
);

customerOpinionRouter.get('/:id',
    validatorHandler(getCustomerOpinionSchema, 'params'),
    async (req, res, next) => {
        try{
            const { id } = req.params;
            const customerOpinion = await service.findOne(id)
            res.json(customerOpinion)
        }catch(error){
            next(error)
        }
    }
);

customerOpinionRouter.post('/',
    autorizationHandler('customer'),
    validatorHandler(createCustomerOpinionSchema, 'body'),
    async (req, res, next) => {
        try{
            const body = req.body;
            const customerOpinion = await service.create(body);
            res.status(201).json(customerOpinion)
        }catch(error){
            next(error)
        }
    }
);

customerOpinionRouter.patch('/:id', 
    validatorHandler(getCustomerOpinionSchema, 'params'),
    autorizationHandler('customer'),
    validatorHandler(updateCustomerOpinionSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const customerOpinion = await service.update(id, body)
            res.status(201).json({
                messaje: `Opinion with id: ${id} modified`,
                customerOpinion
            })
        } catch (error) {
            next(error)
        }
    }
)

customerOpinionRouter.delete('/:id', 
    validatorHandler(getCustomerOpinionSchema, 'params'),
    autorizationHandler('customer'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id)
            res.status(200).json({
                messaje: `Opinion with id: ${id} deleted`,
            })
        } catch (error) {
            next(error)
        }
    }
)

module.exports = {customerOpinionRouter}