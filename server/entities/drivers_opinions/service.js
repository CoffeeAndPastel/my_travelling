const { models } = require("../../libs/sequelize");
const boom = require('@hapi/boom');

class DriversOpinionsService {

  async create(data) {
    const newOpinion = await models.DriversOpinions.create(data);
    return newOpinion;
  }

  async find() {
    const driversOpinions = await models.DriversOpinions.findAll();
    return driversOpinions;
  }

  async findOne(id) {
    const opinion = await models.DriversOpinions.findByPk(id,{
      include: ['trip','customer','driver']
    });

    delete opinion.dataValues.trip.dataValues.driverId;
    delete opinion.dataValues.trip.dataValues.customerId;
    delete opinion.dataValues.trip.dataValues.agencyId;

    if(!opinion){
      throw boom.notFound('Opinion not found');
    }

    return opinion;
  }

  async update(id, changes) {
    const opinion = await this.findOne(id);
    const response = await opinion.update(changes);
    return response;
  }

  async delete(id) {
    const opinion = await this.findOne(id);
    await opinion.destroy();
  }
}

module.exports = DriversOpinionsService;
