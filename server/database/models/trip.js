const { Model, DataTypes, Sequelize} = require('sequelize');
const { AGENCY_TABLE } = require('./agency');
const { CUSTOMER_TABLE } = require('./customer');
const { DRIVER_TABLE } = require('./driver');

const TRIP_TABLE = 'trips';

const tripSchema = {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  state: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  startDate:{
    field: "start_date",
    type: DataTypes.DATEONLY
  },
  endDate:{
    field: "end_date",
    type: DataTypes.DATEONLY
  },
  staringPlace: {
    field: "staring_place",
    type: DataTypes.STRING
  },
  destinyPlace: {
    field: "destiny_place",
    type: DataTypes.STRING
  },
  numberPassengers: {
    field: "number_passengers",
    type: DataTypes.INTEGER()
  },
  price: {
    allowNull: true,
    type: DataTypes.FLOAT()
  },
  customerId:{
    field: "customer_id",
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
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
}

class Trip extends Model{

  static associate(models) {
    this.belongsTo(models.Customer, {as: 'customer'});
    this.belongsTo(models.Driver, {as: 'driver'});
    this.belongsTo(models.Agency, {as: 'agency'});
    this.hasMany(models.Offer, {
      as: 'offers',
      foreignKey: 'tripId'
    });
    this.hasOne(models.DriversOpinions, {
      as: 'driverOpinion',
      foreignKey: 'tripId'
    });
    this.hasOne(models.CustomersOpinions, {
      as: 'costumerOpinion',
      foreignKey: 'tripId'
    });
  }

  static config(sequelize){
    return{
      sequelize,
      tableName: TRIP_TABLE,
      modelName: 'Trip',
    }
  }
}

module.exports = {TRIP_TABLE, tripSchema, Trip}
