const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { config } = require('../../config/config');

function loginHandler(getUser, role){
    return async (req, res, next) => {
        try {
            const user = await getUser(req.body);
            
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) throw boom.notFound(`Not found`);
            
            const payload = {
                sub: user.id,
                role,
            };
            
            const token = jwt.sign(payload, config.jwtSecret);

            res.status(200).json({user, token})
        } catch (error) {
            next(error);
        }
    }
}

module.exports =  {loginHandler};