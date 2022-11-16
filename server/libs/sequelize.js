const { Sequelize } = require('sequelize');
const { config } = require('../../config/config');
const setupModels = require('../database/models');

const sequelize = new Sequelize(config.dbUrl, {
    dialect: 'postgres',
});


setupModels(sequelize);

sequelize.sync()

module.exports = sequelize;