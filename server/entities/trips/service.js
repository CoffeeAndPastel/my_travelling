const { models } = require("../../libs/sequelize");
const boom = require('@hapi/boom');

class TripService {

  async create(data) {
    const newTrip = await models.Trip.create(data);
    return newTrip;
  }

  async find() {
    const trips = await models.Trip.findAll();
    return trips;
  }

  async findOne(id) {
    const trip = await models.Trip.findByPk(id,{
      include: ['customer','agency','driver','offers']
    });
    if(!trip){
      throw boom.notFound('Trip not found');
    }
    delete trip.dataValues.customerId;
    delete trip.dataValues.driverId;
    delete trip.dataValues.agencyId;
    trip.dataValues.offers.map(offer => {
      delete offer.dataValues.tripId;
    })
    return trip;
  }

  async getdOne(id) {
    const trip = await models.Trip.findByPk(id);
    if(!trip){
      throw boom.notFound('Trip not found');
    }
    return trip;
  }

  async update(id, changes) {
    const trip = await this.getdOne(id);
    const response = await trip.update(changes);
    this.tripPrepared(trip);
    return response;
  }

  async delete(id) {
    const trip = await this.getdOne(id);
    await trip.destroy();
  }

  tripPrepared(trip){
    const state = trip.dataValues.state;
    const driverId = trip.dataValues.driverId;
    const agencyId = trip.dataValues.agencyId;
    if(state == 0 && driverId && agencyId)
      trip.update({state: 1});

  }

}

module.exports = TripService;
