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
        createAt: faker.datatype.datetime(),
        modfiedAt: null,
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
        createAt: faker.datatype.datetime(),
        modfiedAt: null,
    };
    return user;
  }
}

module.exports = UserService;
