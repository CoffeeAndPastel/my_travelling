const boom = require('@hapi/boom');
const { models } = require("../../libs/sequelize");

class AgencyService {

  async create(data) {
    const newAgency = await models.Agency.create(data);
    return newAgency;
  }

  async find() {
    const agencies = await models.Agency.findAll();
    return agencies;
  }

  async findOne(id) {
    const agency = await models.Agency.findByPk(id,{
      include: ['drivers','trips']
    });
    agency.dataValues.drivers.map(driver => {
      delete driver.dataValues.agencyId;
      delete driver.dataValues.recoveryToken;
    })
    agency.dataValues.trips.map(trip => {
      delete trip.dataValues.agencyId;
    })
    if(!agency){
      throw boom.notFound('Agency not found');
    }
    return agency;
  }

  async findOneByEmail({email}){
    const agency = await models.Agency.findOne({
      where: {email}
    })
    if(!agency){
      throw boom.notFound('Not found');
    }
    return agency;
  }

  async update(id, changes) {
    const agency = await this.findOne(id);
    const response = await agency.update(changes);
    return response;
  }

  async delete(id) {
    const agency = await this.findOne(id);
    await agency.destroy();
  }
}

module.exports = AgencyService;
