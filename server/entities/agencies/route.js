const express = require('express');
const validatorHandler = require('../../middlewares/validator');
const AgencyService = require('./service');
const {createAgencySchema, updateAgencySchema, getAgencySchema} = require('./schema');
const agencyRouter = express.Router();
const service = new AgencyService;

agencyRouter.get('/',
    async (req, res, next) => {
        try{
            const agencys = await service.find();
            res.json(agencys)
        }catch(error){
            next(error)
        }
    }
);

agencyRouter.get('/:id',
    validatorHandler(getAgencySchema, 'params'),
    async (req, res, next) => {
        try{
            const { id } = req.params;
            const agency = await service.findOne(id)
            res.json(agency)
        }catch(error){
            next(error)
        }
    }
);

agencyRouter.post('/',
    validatorHandler(createAgencySchema, 'body'),
    async (req, res, next) => {
        try{
            const body = req.body;
            const agency = await service.create(body);
            res.status(201).json(agency)
        }catch(error){
            next(error)
        }
    }
);

agencyRouter.patch('/:id', 
    validatorHandler(getAgencySchema, 'params'),
    validatorHandler(updateAgencySchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const agency = await service.update(id, body)
            res.status(201).json({
                messaje: `Agency with id: ${id} modified`,
                agency
            })
        } catch (error) {
            next(error)
        }
    }
)

agencyRouter.delete('/:id', 
    validatorHandler(getAgencySchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id)
            res.status(200).json({
                messaje: `Agency with id: ${id} deleted`,
            })
        } catch (error) {
            next(error)
        }
    }
)

module.exports = {agencyRouter}