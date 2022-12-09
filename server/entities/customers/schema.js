const Joi = require("joi");
const { createUserSchema, updateUserSchema, loginUserSchema } = require("../users/schema");

const id = Joi.number();
const name = Joi.string().pattern(/^[A-Z]([a-z])+$/);
const lastName = Joi.string().pattern(/^[A-Z]([a-z])+$/);
const createUser = createUserSchema;
const updateUser = updateUserSchema;

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  ...createUser
});

const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  ...updateUser
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const loginCustomerSchema = Joi.object({
  ...loginUserSchema
});

module.exports = {createCustomerSchema, updateCustomerSchema, getCustomerSchema, loginCustomerSchema}
