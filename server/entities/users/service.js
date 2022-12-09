const { faker } = require("@faker-js/faker");

class UserService {
  generate() {
    return {
        phone: faker.phone.number('##########'),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        iconPhoto: faker.image.avatar(),
        recoveryToken: null,
        createdAt: faker.datatype.datetime(),
        modifiedAt: null,
    }
  }

  create(data) {
    const user = {
        phone: data.phone || null,
        username: data.username,
        email: data.email,
        password: data.password,
        iconPhoto: data.iconPhoto || null,
        recoveryToken: null,
        createdAt: faker.datatype.datetime(),
        modifiedAt: null,
    };
    return user;
  }
}

module.exports = UserService;
