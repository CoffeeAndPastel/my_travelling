const Joi = require("joi");

const id = Joi.number();
const email = Joi.string().email();
const password = Joi.string().alphanum().min(6);
const profilePhoto = Joi.string().uri();
const role = Joi.string();

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
  profilePhoto,
});

const updateUserSchema = Joi.object({
  profilePhoto,
  email,
  role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = {createUserSchema, updateUserSchema, getUserSchema}
