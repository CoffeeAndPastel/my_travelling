const { Model, DataTypes, Sequelize} = require('sequelize');
const { UserSchema } = require('./user');

const AGENCY_TABLE = 'agencies';

const agencySchema = {
  ...UserSchema,
}

class Agency extends Model{

  static associate(models) {
    
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
