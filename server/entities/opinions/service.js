const { faker } = require("@faker-js/faker");

class OpinionService {
  generate() {
    return {
        customerId: faker.datatype.number(10),
        driverId: faker.datatype.number(10),
        commentary: faker.lorem.sentence(),
        serviceQuality: faker.datatype.number(4),
        respect: faker.datatype.number(4),
        cleanning: faker.datatype.number(4),
    }
  }

  create(data) {
    const opinion = {
      customerId: data.customerId,
      driverId: data.driverId,
      commentary: data.commentary, 
      serviceQuality: data.serviceQuality,
      respect: data.respect,
      cleanning: data.cleanning,
    };
    return opinion;
  }
}

module.exports = OpinionService;
