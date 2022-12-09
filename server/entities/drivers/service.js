const { models } = require("../../libs/sequelize");
const boom = require('@hapi/boom');

class DriverService {

  async create(data) {
    const newDriver = await models.Driver.create(data);
    return newDriver;
  }

  async find() {
    const drivers = await models.Driver.findAll();
    return drivers;
  }

  async findOne(id) {
    const driver = await models.Driver.findByPk(id,{
      include: ['agency','trips']
    });
    
    if(!driver){
      throw boom.notFound('Driver not found');
    }
    
    delete driver.dataValues.agencyId;
    driver.dataValues.trips.map(trip => {
      delete trip.dataValues.driverId;
    })
    
    return driver;
  }

  async findOneByEmail({email}){
    const driver = await models.Driver.findOne({
      where: {email}
    })
    if(!driver){
      throw boom.notFound('Not found');
    }
    return driver;
  }

  async update(id, changes) {
    const driver = await this.findOne(id);
    const response = await driver.update(changes);
    return response;
  }

  async delete(id) {
    const driver = await this.findOne(id);
    await driver.destroy();
  }
}

module.exports = DriverService;
