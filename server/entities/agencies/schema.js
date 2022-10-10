const Joi = require("joi");
const { createUserSchema, updateUserSchema } = require("../users/schema");

const id = Joi.number();
const createUser = createUserSchema;
const updateUser = updateUserSchema;

const createAgencySchema = Joi.object({
  ...createUser
});

const updateAgencySchema = Joi.object({
  ...updateUser
});

const getAgencySchema = Joi.object({
  id: id.required(),
});

module.exports = {createAgencySchema, updateAgencySchema, getAgencySchema}
