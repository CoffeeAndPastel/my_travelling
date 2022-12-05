const { Model, DataTypes, Sequelize} = require('sequelize');
const { AGENCY_TABLE } = require('./agency');
const { UserSchema, userHooks } = require('./user');

const DRIVER_TABLE = 'drivers';

const driverSchema = {
  ...UserSchema,
  name: {
    type: DataTypes.STRING,
  },
  lastName: {
    field: "last_name",
    type: DataTypes.STRING,
  },
  agencyId: {
    field: "agency_id",
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: AGENCY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Driver extends Model{

  static associate(models) {
    this.belongsTo(models.Agency, {as: 'agency'});
    this.hasMany(models.Trip, {
      as: 'trips',
      foreignKey: 'driverId'
    });
    this.hasMany(models.Offer, {
      as: 'offers',
      foreignKey: 'driverId'
    });
    this.hasMany(models.CustomersOpinions, {
      as: 'myOpinions',
      foreignKey: 'driverId'
    });
    this.hasMany(models.DriversOpinions, {
      as: 'opinions',
      foreignKey: 'driverId'
    });
  }

  static config(sequelize){
    return{
      sequelize,
      tableName: DRIVER_TABLE,
      modelName: 'Driver',
      hooks: userHooks
    }
  }
}

module.exports = {DRIVER_TABLE, driverSchema, Driver}
