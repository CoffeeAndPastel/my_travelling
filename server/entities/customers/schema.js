const Joi = require("joi");

const id = Joi.number();
const name = Joi.string().pattern(/^[A-Z]([a-z])+$/);
const lastName = Joi.string().pattern(/^[A-Z]([a-z])+$/);
const phone = Joi.string().pattern(/[0-9]{10}$/);
const userId = Joi.number();

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  userId: userId.required()
});

const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  userId: userId
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = {createCustomerSchema, updateCustomerSchema, getCustomerSchema}
