const Joi = require("joi");

const id = Joi.number();
// const state = Joi.number().min(0).max(3);
const startDate = Joi.date().min("now");
const endDate = Joi.date().greater("now");
const staringPlace = Joi.string();
const destinyPlace = Joi.string();
const numberPassengers = Joi.number().min(1);
const customerId = Joi.number();
const agencyId = Joi.number();
const driverId = Joi.number();
const price = Joi.number();


const createTripSchema = Joi.object({
  startDate: startDate.required(),
  endDate: endDate.required(),
  staringPlace: staringPlace.required(),
  destinyPlace: destinyPlace.required(),
  numberPassengers: numberPassengers.required(),
  customerId: customerId.required(),
});

const updateTripSchema = Joi.object({
  startDate,
  endDate,
  staringPlace,
  destinyPlace,
  numberPassengers,
  customerId,
  agencyId,
  driverId,
  price
});

const getTripSchema = Joi.object({
  id: id.required(),
});

module.exports = {createTripSchema, updateTripSchema, getTripSchema}
