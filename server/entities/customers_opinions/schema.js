const Joi = require("joi");
const { createOpinionSchema, updateOpinionSchema } = require("../opinions/schema");

const id = Joi.number();
const driving = Joi.number().min(0).max(4);
const createOpinion = createOpinionSchema;
const updateOpinion = updateOpinionSchema;

const createCustomerOpinionSchema = Joi.object({
  ...createOpinion,
  driving: driving.required()
});

const updateCustomerOpinionSchema = Joi.object({
  ...updateOpinion,
  driving
});

const getCustomerOpinionSchema = Joi.object({
  id: id.required(),
});

module.exports = {createCustomerOpinionSchema, updateCustomerOpinionSchema, getCustomerOpinionSchema}
