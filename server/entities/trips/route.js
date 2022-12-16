const express = require('express');
const validatorHandler = require('../../middlewares/validator');
const TripService = require('./service');
const {createTripSchema, updateTripSchema, getTripSchema} = require('./schema');
const { autorizationHandler } = require('../../middlewares/auth');
const tripRouter = express.Router();
const service = new TripService;

tripRouter.get('/',
    async (req, res, next) => {
        try{
            const trips = await service.find();
            res.json(trips)
        }catch(error){
            next(error)
        }
    }
);

tripRouter.get('/:id',
    validatorHandler(getTripSchema, 'params'),
    async (req, res, next) => {
        try{
            const { id } = req.params;
            const trip = await service.findOne(id)
            res.json(trip)
        }catch(error){
            next(error)
        }
    }
);

tripRouter.post('/',
    autorizationHandler('customer'),
    validatorHandler(createTripSchema, 'body'),
    async (req, res, next) => {
        try{
            const body = req.body;
            const trip = await service.create(body);
            res.status(201).json(trip)
        }catch(error){
            next(error)
        }
    }
);

tripRouter.patch('/:id', 
    validatorHandler(getTripSchema, 'params'),
    autorizationHandler('customer','driver'),
    validatorHandler(updateTripSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const trip = await service.update(id, body)
            res.status(201).json({
                messaje: `Trip with id: ${id} modified`,
                trip
            })
        } catch (error) {
            next(error)
        }
    }
)

tripRouter.delete('/:id', 
    validatorHandler(getTripSchema, 'params'),
    autorizationHandler('customer'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id)
            res.status(200).json({
                messaje: `Trip with id: ${id} deleted`,
            })
        } catch (error) {
            next(error)
        }
    }
)

module.exports = {tripRouter}