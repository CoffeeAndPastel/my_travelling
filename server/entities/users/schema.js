const Joi = require("joi");

const phone = Joi.string().pattern(/[0-9]{10}$/);
const username = Joi.string().min(3);
const email = Joi.string().email();
const password = Joi.string().alphanum().min(6);
const iconPhoto = Joi.string().uri();


const createUserSchema = {
  phone,
  username: username.required(),
  email: email.required(),
  password: password.required(),
  iconPhoto,
};

const updateUserSchema = {
  phone,
  username,
  email,
  password,
  iconPhoto,
};

const loginUserSchema = {
  email: email.required(),
  password: password.required(),
}

module.exports = {createUserSchema, updateUserSchema, loginUserSchema}
