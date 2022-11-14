const { faker } = require("@faker-js/faker");
const boom = require('@hapi/boom');
const { options } = require("joi");

class TripService {
  constructor() {
    this.trips = [];
    this._generate();
  }

  async _generate() {
    for (let i = 0; i < 10; i++) {
      this.trips.push({
        id: i + 1,
        state: 0,
        startDate: faker.datatype.datetime(),
        endDate: faker.datatype.datetime(),
        staringPlace: faker.address.cityName(),
        destinyPlace: faker.address.cityName(),
        numberPassengers: faker.datatype.number({ min: 1, max: 30}),
        customerId: faker.datatype.number(10),
        agencyId: null,
        driverId: null,
        createdAt: faker.datatype.datetime(),
        modifiedAt: null,
      });
    }
  }

  async create(data) {
    const trip = {
      id: this.trips.length + 1,
      state: 0,
      startDate: data.startDate,
      endDate: data.endDate,
      staringPlace: data.staringPlace,
      destinyPlace: data.destinyPlace,
      numberPassengers: data.numberPassengers,
      customerId: data.customerId,
      agencyId: null,
      driverId: null,
      createdAt: faker.datatype.datetime(),
      modifiedAt: null,
    };
    this.trips.push(trip);
    return trip;
  }

  async find() {
    return this.trips;
  }

  findIndex(id) {
    const index = this.trips.findIndex(trip => trip.id == id);
    if(index === -1){
        throw boom.notFound("Trip not found")
    }
    return index
  }

  async findOne(id) {
    const index = this.findIndex(id);
    return this.trips[index];
  }

  async update(id, changes) {
    const index = this.findIndex(id);
    this.trips[index] =  {
      ...this.trips[index],
      ...changes,
      // state: (this.trips[index].agencyId && this.trips[index].driverId && 1 || this.trips[]),
      modifiedAt: faker.datatype.datetime()
    }
    if(this.trips[index].agencyId && this.trips[index].driverId){
        this.trips[index]['state'] = 1;
    }
    return this.trips[index];
  }

  async delete(id) {
    const index = this.findIndex(id);
    this.trips.splice(index, 1)
  }
}

module.exports = TripService;
