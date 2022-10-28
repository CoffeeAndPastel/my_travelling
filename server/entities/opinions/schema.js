const Joi = require("joi");

const customerId = Joi.number();
const driverId = Joi.number();
const serviceQuality = Joi.number().min(0).max(4);
const respect = Joi.number().min(0).max(4);
const cleanning = Joi.number().min(0).max(4);
const commentary = Joi.string();

const createOpinionSchema = {
  customerId: customerId.required(),
  driverId: driverId.required(),
  serviceQuality: serviceQuality.required(),
  respect: respect.required(),
  cleanning: cleanning.required(),
  commentary: commentary.required(),
};

const updateOpinionSchema = {
  serviceQuality,
  respect,
  cleanning,
  commentary,
};

module.exports = {createOpinionSchema, updateOpinionSchema}
