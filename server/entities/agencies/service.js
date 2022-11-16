const { faker } = require("@faker-js/faker");
const boom = require('@hapi/boom');
const { models } = require("../../libs/sequelize");
const UserService = require("../users/service");

class AgencyService {
  constructor() {
    this.userService = new UserService();
    this.agencies = [];
    this._generate();
  }

  async _generate() {
    for (let i = 0; i < 10; i++) {
      const userData = this.userService.generate();
      this.agencies.push({
        id: i + 1,
        ...userData
      });
    }
  }

  async create(data) {
    const newUser = this.userService.create(data);
    const agency = {
      id: this.agencies.length + 1,
      ...newUser
    };
    this.agencies.push(agency);
    return agency;
  }

  async find() {
    const agencies = await models.Agency.findAll();
    return agencies;
  }

  findIndex(id) {
    const index = this.agencies.findIndex(agency => agency.id == id);
    if(index === -1){
        throw boom.notFound("Agency not found")
    }
    return index
  }

  async findOne(id) {
    const index = this.findIndex(id);
    return this.agencies[index];
  }

  async update(id, changes) {
    const index = this.findIndex(id);
    this.agencies[index] =  {
        ...this.agencies[index],
        ...changes,
        modifiedAt: faker.datatype.datetime()
    }
    return this.agencies[index];
  }

  async delete(id) {
    const index = this.findIndex(id);
    this.agencies.splice(index, 1)
  }
}

module.exports = AgencyService;
