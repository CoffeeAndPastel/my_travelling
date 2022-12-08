const Joi = require("joi");
const { createUserSchema, updateUserSchema, loginUserSchema } = require("../users/schema");

const id = Joi.number();
const createUser = createUserSchema;
const updateUser = updateUserSchema;
const loginUser = loginUserSchema;

const createAgencySchema = Joi.object({
  ...createUser
});

const updateAgencySchema = Joi.object({
  ...updateUser
});

const getAgencySchema = Joi.object({
  id: id.required(),
});

const loginAgencySchema = Joi.object({
  ...loginUser
});

module.exports = {createAgencySchema, updateAgencySchema, getAgencySchema, loginAgencySchema}
