const { models } = require("../../libs/sequelize");
const boom = require('@hapi/boom');

class Offer {
  async create(data) {
    const newOffer = await models.Offer.create(data);
    return newOffer;
  }

  async find() {
    const offers = await models.Offer.findAll();
    return offers;
  }

  async findOne(id) {
    const offer = await models.Offer.findByPk(id,{
      include: ['trip','agency','driver']
    });
    
    if(!offer){
      throw boom.notFound('Offer not found');
    }
    
    delete offer.dataValues.tripId;
    delete offer.dataValues.agencyId;
    delete offer.dataValues.driverId;
    
    return offer;
  }

  async update(id, changes) {
    const offer = await this.findOne(id);
    const response = await offer.update(changes);
    return response;
  }

  async delete(id) {
    const offer = await this.findOne(id);
    await offer.destroy();
  }
}

module.exports = Offer;
