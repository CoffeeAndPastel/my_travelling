const { Model, DataTypes} = require('sequelize');
const { opinionSchema } = require('./opinions');

const CUSTOMERS_OPIONIONS_TABLE = 'customers_opinions';

const customersOpinonsSchema = {
  ...opinionSchema,
  driving:{
    type: DataTypes.INTEGER,
  },
}

class CustomersOpinions extends Model{

  static associate(models) {
    this.belongsTo(models.Customer, {as: 'customer'});
    this.belongsTo(models.Driver, {as: 'driver'});  
    this.belongsTo(models.Trip, {as: 'trip'});  
  }

  static config(sequelize){
    return{
      sequelize,
      tableName: CUSTOMERS_OPIONIONS_TABLE,
      modelName: 'CustomersOpinions',
    }
  }
}

module.exports = {CUSTOMERS_OPIONIONS_TABLE, customersOpinonsSchema, CustomersOpinions}
