const { Model, DataTypes, Sequelize} = require('sequelize');
const { UserSchema, userHooks } = require('./user');

const CUSTOMER_TABLE = 'customers';

const customerSchema = {
  ...UserSchema,
  name: {
    type: DataTypes.STRING,
  },
  lastName: {
    field: "last_name",
    type: DataTypes.STRING,
  },
}

class Customer extends Model{

  static associate(models) {
    this.hasMany(models.Trip, {
      as: 'trips',
      foreignKey: 'customerId'
    });
    this.hasMany(models.DriversOpinions, {
      as: 'myOpinons',
      foreignKey: 'customerId'
    });
    this.hasMany(models.CustomersOpinions, {
      as: 'opinons',
      foreignKey: 'customerId'
    });
  }

  static config(sequelize){
    return{
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      hooks: userHooks
    }
  }
}

module.exports = {CUSTOMER_TABLE, customerSchema, Customer}
