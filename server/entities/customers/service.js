const { faker } = require("@faker-js/faker");
const boom = require('@hapi/boom');

class CustomerService {
  constructor() {
    this.customers = [];
    this._generate();
  }

  async _generate() {
    for (let i = 0; i < 10; i++) {
      this.customers.push({
        id: i + 1,
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.number('##########'),
        userId: faker.datatype.number({min: 1, max: 10})
      });
    }
  }

  async create(data) {
    console.log(data);
    const customer = {
      id: this.customers.length + 1,
      name: data.name,
      lastName: data.lastName,
      phone: data.phone,
      userId: data.userId
    };
    this.customers.push(customer);
    return customer;
  }

  async find() {
    return this.customers;
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
        ...changes
    }
    return this.customers[index];
  }

  async delete(id) {
    const index = this.findIndex(id);
    this.customers.splice(index, 1)
  }
}

module.exports = CustomerService;
