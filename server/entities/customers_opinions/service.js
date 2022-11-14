const { faker } = require("@faker-js/faker");
const boom = require('@hapi/boom');
const OpinionService = require("../opinions/service");

class CustomersOpinionsService {
  constructor() {
    this.OpinionService = new OpinionService();
    this.customersOpinions = [];
    this._generate();
  }

  async _generate() {
    for (let i = 0; i < 10; i++) {
      const opinionData = this.OpinionService.generate();
      this.customersOpinions.push({
        id: i + 1,
        ...opinionData,
        driving: faker.datatype.number(4),
      });
    }
  }

  async create(data) {
    const newOpinion = this.OpinionService.create(data);
    const customerOpinion = {
      id: this.customersOpinions.length + 1,
      ...newOpinion,
      driving: data.driving
    };
    this.customersOpinions.push(customerOpinion);
    return customerOpinion;
  }

  async find() {
    return this.customersOpinions;
  }

  findIndex(id) {
    const index = this.customersOpinions.findIndex(customerOpinion => customerOpinion.id == id);
    if(index === -1){
        throw boom.notFound("Opinion not found")
    }
    return index
  }

  async findOne(id) {
    const index = this.findIndex(id);
    return this.customersOpinions[index];
  }

  async update(id, changes) {
    const index = this.findIndex(id);
    this.customersOpinions[index] =  {
        ...this.customersOpinions[index],
        ...changes,
        modifiedAt: faker.datatype.datetime()
    }
    return this.customersOpinions[index];
  }

  async delete(id) {
    const index = this.findIndex(id);
    this.customersOpinions.splice(index, 1)
  }
}

module.exports = CustomersOpinionsService;
