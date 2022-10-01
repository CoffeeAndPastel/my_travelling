const express = require('express');
const validatorHandler = require('../../middlewares/validator');
const {createCustomerSchema, updateCustomerSchema, getCustomerSchema} = require('./schema');
const CustomerService = require('./service');
const customerRouter = express.Router();
const service = new CustomerService;

customerRouter.get('/',
    async (req, res, next) => {
        try{
            const customers = await service.find();
            res.json(customers)
        }catch(error){
            next(error)
        }
    }
);

customerRouter.get('/:id',
    validatorHandler(getCustomerSchema, 'params'),
    async (req, res, next) => {
        try{
            const { id } = req.params;
            const customer = await service.findOne(id)
            res.json(customer)
        }catch(error){
            next(error)
        }
    }
);

customerRouter.post('/',
    validatorHandler(createCustomerSchema, 'body'),
    async (req, res, next) => {
        try{
            const body = req.body;
            const customer = await service.create(body);
            res.status(201).json(customer)
        }catch(error){
            next(error)
        }
    }
);

customerRouter.patch('/:id', 
    validatorHandler(getCustomerSchema, 'params'),
    validatorHandler(updateCustomerSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const customer = await service.update(id, body)
            res.status(201).json({
                messaje: `Customer with id: ${id} modify`,
                customer
            })
        } catch (error) {
            next(error)
        }
    }
)

customerRouter.delete('/:id', 
    validatorHandler(getCustomerSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id)
            res.status(201).json({
                messaje: `Customer with id: ${id} deleted`,
            })
        } catch (error) {
            next(error)
        }
    }
)

module.exports = {customerRouter}