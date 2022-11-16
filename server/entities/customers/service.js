const { models } = require("../../libs/sequelize");
const { faker } = require("@faker-js/faker");
const boom = require('@hapi/boom');
const UserService = require("../users/service");

class CustomerService {
  constructor() {
    this.userService = new UserService();
    this.customers = [];
    this._generate();
  }

  async _generate() {
    for (let i = 0; i < 10; i++) {
      const userData = this.userService.generate();
      this.customers.push({
        id: i + 1,
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        ...userData
      });
    }
  }

  async create(data) {
    const newUser = this.userService.create(data);
    const customer = {
      id: this.customers.length + 1,
      name: data.name,
      lastName: data.lastName,
      ...newUser
    };
    this.customers.push(customer);
    return customer;
  }

  async find() {
    const customers = await models.Customer.findAll();
    return customers;
  }

  findIndex(id) {
    const index = this.customers.findIndex(customer => customer.id == id);
    if(index === -1){
        throw boom.notFound("Customer not found")
    }
    return index
  }

  async findOne(id) {
    const index = this.findIndex(id);
    return this.customers[index];
  }

  async update(id, changes) {
    const index = this.findIndex(id);
    this.customers[index] =  {
        ...this.customers[index],
        ...changes,
        modifiedAt: faker.datatype.datetime()
    }
    return this.customers[index];
  }

  async delete(id) {
    const index = this.findIndex(id);
    this.customers.splice(index, 1)
  }
}

module.exports = CustomerService;
