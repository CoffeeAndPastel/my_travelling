const express = require('express');
const UserService = require('./service');
const userRouter = express.Router();
const service = new UserService();

userRouter.get('/',async (req, res) => {
    const data = await service.find();
    res.json(data)
});

module.exports = {userRouter}