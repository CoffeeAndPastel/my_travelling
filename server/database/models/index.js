const { agencySchema, Agency } = require("./agency");
const { Customer, customerSchema } = require("./customer");

function setupModels(sequelize){
    Agency.init(agencySchema, Agency.config(sequelize));
    Customer.init(customerSchema, Customer.config(sequelize));

}

module.exports = setupModels;