const { Model, DataTypes} = require('sequelize');
const { AGENCY_TABLE } = require('./agency');
const { DRIVER_TABLE } = require('./driver');
const { TRIP_TABLE } = require('./trip');

const OFFERS_TABLE = 'offers';

const offerSchema = {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  state: {
    type: DataTypes.INTEGER,
    defaultValue: 0
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
  },
  driverId: {
    field: "driver_id",
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: DRIVER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  tripId: {
    field: "trip_id",
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: TRIP_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  price: {
    type: DataTypes.FLOAT()
  },
}

class Offer extends Model{

  static associate(models) {
    this.belongsTo(models.Agency, {as: 'agency'});
    this.belongsTo(models.Driver, {as: 'driver'});
    this.belongsTo(models.Trip, {as: 'trip'});
  }

  static config(sequelize){
    return{
      sequelize,
      tableName: OFFERS_TABLE,
      modelName: 'Offer',
    }
  }
}

module.exports = {OFFERS_TABLE, offerSchema, Offer}
