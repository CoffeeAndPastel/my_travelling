const Joi = require("joi");

const id = Joi.number();
const tripId = Joi.number();
const agencyId = Joi.number();
const driverId = Joi.number();
const price = Joi.number();


const createOfferrSchema = Joi.object({
  tripId: tripId.required(),
  agencyId: agencyId.required(),
  driverId: driverId.required(),
  price: price.required(),
});

const updateOfferrSchema = Joi.object({
  driverId,
  price,
  
});

const getOfferrSchema = Joi.object({
  id: id.required(),
});

module.exports = {createOfferrSchema, updateOfferrSchema, getOfferrSchema}
