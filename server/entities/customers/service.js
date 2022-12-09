const { models } = require("../../libs/sequelize");
const boom = require('@hapi/boom');

class CustomerService {
  async create(data) {
    const newCustomer = await models.Customer.create(data);
    return newCustomer;
  }

  async find() {
    const customers = await models.Customer.findAll();
    return customers;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id,{
      include: ['trips']
    });
    customer.dataValues.trips.map(trip => {
      delete trip.dataValues.customerId;
    })
    if(!customer){
      throw boom.notFound('Customer not found');
    }
    return customer;
  }

  async findOneByEmail({email}){
    const customer = await models.Customer.findOne({
      where: {email}
    })
    if(!customer){
      throw boom.notFound('Not found');
    }
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const response = await customer.update(changes);
    return response;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
  }
}

module.exports = CustomerService;
