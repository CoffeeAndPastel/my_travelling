const express = require('express');
const UserService = require('./service');
const userRouter = express.Router();
const service = new UserService();

userRouter.get('/',async (req, res, next) => {
    try{
        const users = await service.find();
        res.json(users)
    }catch(error){
        next(error)
    }
});

userRouter.get('/:id',async (req, res, next) => {
    try{
        const { id } = req.params;
        const user = await service.findOne(id)
        res.json(user)
    }catch(error){
        res.status(404).json({message: error.message})
        // next(error)
    }
});

userRouter.post('/',async (req, res, next) => {
    try{
        const body = req.body;
        const user = await service.create(body);
        res.status(201).json(user)
    }catch(error){
        next(error)
    }
});

userRouter.patch('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const user = await service.update(id, body)
        res.status(201).json({
            messaje: `User with id: ${id} modify`,
            user
        })
    } catch (error) {
        res.status(404).json({message: error.message})
        // next(error)
    }
})

userRouter.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await service.delete(id)
        res.status(201).json({
            messaje: `User with id: ${id} deleted`,
        })
    } catch (error) {
        res.status(404).json({message: error.message})
        // next(error)
    }
})

module.exports = {userRouter}