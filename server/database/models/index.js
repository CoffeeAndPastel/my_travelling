const { agencySchema, Agency } = require("./agency");
const { Customer, customerSchema } = require("./customer");
const { CustomersOpinions, customersOpinonsSchema } = require("./customers_opinions");
const { Driver, driverSchema } = require("./driver");
const { DriversOpinions, driversOpinonsSchema } = require("./drivers_opinions");
const { Offer, offerSchema } = require("./offers");
const { Trip, tripSchema } = require("./trip");

function setupModels(sequelize){
    Agency.init(agencySchema, Agency.config(sequelize));
    Customer.init(customerSchema, Customer.config(sequelize));
    Driver.init(driverSchema, Driver.config(sequelize));
    Trip.init(tripSchema, Trip.config(sequelize));
    Offer.init(offerSchema, Offer.config(sequelize));
    DriversOpinions.init(driversOpinonsSchema, DriversOpinions.config(sequelize));
    CustomersOpinions.init(customersOpinonsSchema, CustomersOpinions.config(sequelize));

    Trip.associate(sequelize.models);
    Customer.associate(sequelize.models);
    Agency.associate(sequelize.models);
    Driver.associate(sequelize.models);
    Offer.associate(sequelize.models);
    DriversOpinions.associate(sequelize.models);
    CustomersOpinions.associate(sequelize.models);
}

module.exports = setupModels;