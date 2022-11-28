const { Model, DataTypes, Sequelize} = require('sequelize');
const { UserSchema } = require('./user');

const AGENCY_TABLE = 'agencies';

const agencySchema = {
  ...UserSchema,
}

class Agency extends Model{

  static associate(models) {
    this.hasMany(models.Driver, {
      as: 'drivers',
      foreignKey: 'agencyId'
    });
    this.hasMany(models.Trip, {
      as: 'trips',
      foreignKey: 'agencyId'
    });
    this.hasMany(models.Offer, {
      as: 'offers',
      foreignKey: 'agencyId'
    });
  }

  static config(sequelize){
    return{
      sequelize,
      tableName: AGENCY_TABLE,
      modelName: 'Agency',
    }
  }
}

module.exports = {AGENCY_TABLE, agencySchema, Agency}
