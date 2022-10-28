const { faker } = require("@faker-js/faker");
const boom = require('@hapi/boom');

class Offer {
  constructor() {
    this.offers = [];
    this._generate();
  }

  async _generate() {
    for (let i = 0; i < 10; i++) {
      this.offers.push({
        id: i + 1,
        tripId: faker.datatype.number(10),
        state: 0,
        agencyId: faker.datatype.number(10),
        driverId: faker.datatype.number(10),
        price: faker.commerce.price(),
        createAt: faker.datatype.datetime(),
        modfiedAt: null,
      });
    }
  }

  async create(data) {
    const offer = {
      id: this.offers.length + 1,
      tripId: data.tripId,
      state: 0,
      agencyId: data.agencyId,
      driverId: data.driverId,
      price: data.price,
      createAt: faker.datatype.datetime(),
      modfiedAt: null,
    };
    this.offers.push(offer);
    return offer;
  }

  async find() {
    return this.offers;
  }

  findIndex(id) {
    const index = this.offers.findIndex(offer => offer.id == id);
    if(index === -1){
        throw boom.notFound("Offer not found")
    }
    return index
  }

  async findOne(id) {
    const index = this.findIndex(id);
    return this.offers[index];
  }

  async update(id, changes) {
    const index = this.findIndex(id);
    this.offers[index] =  {
        ...this.offers[index],
        ...changes,
        modfiedAt: faker.datatype.datetime()
    }
    return this.offers[index];
  }

  async delete(id) {
    const index = this.findIndex(id);
    this.offers.splice(index, 1)
  }
}

module.exports = Offer;
