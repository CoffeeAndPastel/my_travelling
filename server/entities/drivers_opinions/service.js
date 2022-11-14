const { faker } = require("@faker-js/faker");
const boom = require('@hapi/boom');
const OpinionService = require("../opinions/service");

class DriversOpinionsService {
  constructor() {
    this.OpinionService = new OpinionService();
    this.driversOpinions = [];
    this._generate();
  }

  async _generate() {
    for (let i = 0; i < 10; i++) {
      const opinionData = this.OpinionService.generate();
      this.driversOpinions.push({
        id: i + 1,
        ...opinionData
      });
    }
  }

  async create(data) {
    const newOpinion = this.OpinionService.create(data);
    const driverOpinion = {
      id: this.driversOpinions.length + 1,
      ...newOpinion
    };
    this.driversOpinions.push(driverOpinion);
    return driverOpinion;
  }

  async find() {
    return this.driversOpinions;
  }

  findIndex(id) {
    const index = this.driversOpinions.findIndex(driverOpinion => driverOpinion.id == id);
    if(index === -1){
        throw boom.notFound("Opinion not found")
    }
    return index
  }

  async findOne(id) {
    const index = this.findIndex(id);
    return this.driversOpinions[index];
  }

  async update(id, changes) {
    const index = this.findIndex(id);
    this.driversOpinions[index] =  {
        ...this.driversOpinions[index],
        ...changes,
        modifiedAt: faker.datatype.datetime()
    }
    return this.driversOpinions[index];
  }

  async delete(id) {
    const index = this.findIndex(id);
    this.driversOpinions.splice(index, 1)
  }
}

module.exports = DriversOpinionsService;
