const Joi = require("joi");
const { createUserSchema, updateUserSchema, loginUserSchema } = require("../users/schema");

const id = Joi.number();
const name = Joi.string().pattern(/^[A-Z]([a-z])+$/);
const lastName = Joi.string().pattern(/^[A-Z]([a-z])+$/);
const agencyId = Joi.number();
const createUser = createUserSchema;
const updateUser = updateUserSchema;

const createDriverSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  agencyId: agencyId,
  ...createUser
});

const updateDriverSchema = Joi.object({
  name: name,
  lastName: lastName,
  agencyId: agencyId,
  ...updateUser
});

const getDriverSchema = Joi.object({
  id: id.required(),
});

const loginDriverSchema = Joi.object({
  ...loginUserSchema
});

module.exports = {createDriverSchema, updateDriverSchema, getDriverSchema, loginDriverSchema}
