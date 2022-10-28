const Joi = require("joi");
const { createOpinionSchema, updateOpinionSchema } = require("../opinions/schema");

const id = Joi.number();
const createOpinion = createOpinionSchema;
const updateOpinion = updateOpinionSchema;

const createDriverOpinionSchema = Joi.object({
  ...createOpinion
});

const updateDriverOpinionSchema = Joi.object({
  ...updateOpinion
});

const getDriverOpinionSchema = Joi.object({
  id: id.required(),
});

module.exports = {createDriverOpinionSchema, updateDriverOpinionSchema, getDriverOpinionSchema}
