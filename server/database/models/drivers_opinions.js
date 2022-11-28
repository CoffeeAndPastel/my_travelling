const { Model, DataTypes, Sequelize} = require('sequelize');
const { opinionSchema } = require('./opinions');

const DRIVERS_OPIONIONS_TABLE = 'drivers_opinions';

const driversOpinonsSchema = {
  ...opinionSchema,
}

class DriversOpinions extends Model{

  static associate(models) {
    this.belongsTo(models.Customer, {as: 'customer'});
    this.belongsTo(models.Driver, {as: 'driver'});  
    this.belongsTo(models.Trip, {as: 'trip'});  
  }

  static config(sequelize){
    return{
      sequelize,
      tableName: DRIVERS_OPIONIONS_TABLE,
      modelName: 'DriversOpinions',
    }
  }
}

module.exports = {DRIVERS_OPIONIONS_TABLE, driversOpinonsSchema, DriversOpinions}
