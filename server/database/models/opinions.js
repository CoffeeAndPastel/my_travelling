const { DataTypes } = require("sequelize");
const { CUSTOMER_TABLE } = require("./customer");
const { DRIVER_TABLE } = require("./driver");
const { TRIP_TABLE } = require("./trip");

const opinionSchema = {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
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
    commentary:{
        type: DataTypes.TEXT,
    },
    serviceQuality:{
        field: "service_quality",
        type: DataTypes.INTEGER,
    },
    respect:{
        type: DataTypes.INTEGER,
    },
    cleanning:{
        type: DataTypes.INTEGER,
    },
}

module.exports = {opinionSchema};