const { faker } = require("@faker-js/faker");
const boom = require('@hapi/boom');
const UserService = require("../users/service");

class DriverService {
  constructor() {
    this.userService = new UserService();
    this.drivers = [];
    this._generate();
  }

  async _generate() {
    for (let i = 0; i < 10; i++) {
      const userData = this.userService.generate();
      this.drivers.push({
        id: i + 1,
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        agencyId: faker.datatype.number(0,100),
        ...userData
      });
    }
  }

  async create(data) {
    const newUser = this.userService.create(data);
    const driver = {
      id: this.drivers.length + 1,
      name: data.name,
      lastName: data.lastName,
      agencyId: data.agencyId || null,
      ...newUser
    };
    this.drivers.push(driver);
    return driver;
  }

  async find() {
    return this.drivers;
  }

  findIndex(id) {
    const index = this.drivers.findIndex(driver => driver.id == id);
    if(index === -1){
        throw boom.notFound("Driver not found")
    }
    return index
  }

  async findOne(id) {
    const index = this.findIndex(id);
    return this.drivers[index];
  }

  async update(id, changes) {
    const index = this.findIndex(id);
    this.drivers[index] =  {
        ...this.drivers[index],
        ...changes
    }
    return this.drivers[index];
  }

  async delete(id) {
    const index = this.findIndex(id);
    this.drivers.splice(index, 1)
  }
}

module.exports = DriverService;
