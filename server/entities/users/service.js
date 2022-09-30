const { faker } = require("@faker-js/faker");
const boom = require('@hapi/boom');

class UserService {
  constructor() {
    this.users = [];
    this._generate();
  }

  async _generate() {
    for (let i = 0; i < 10; i++) {
      this.users.push({
        id: i + 1,
        email: faker.internet.email(),
        password: faker.internet.password(),
        profilePhoto: faker.image.avatar(),
        role: null,
        recoveryToken: null,
      });
    }
  }

  async create(data) {
    console.log(data);
    const user = {
      id: this.users.length + 1,
      email: data.email,
      password: data.password,
      profilePhoto: data.profilePhoto || null,
      role: data.role,
      recoveryToken: null,
    };
    this.users.push(user);
    return user;
  }

  async find() {
    return this.users;
  }

  findIndex(id) {
    const index = this.users.findIndex(user => user.id == id);
    if(index === -1){
        throw boom.notFound("User not found")
    }
    return index
  }

  async findOne(id) {
    const index = this.findIndex(id);
    return this.users[index];
  }

  async update(id, changes) {
    const index = this.findIndex(id);
    this.users[index] =  {
        ...this.users[index],
        ...changes
    }
    return this.users[index];
  }

  async delete(id) {
    const index = this.findIndex(id);
    this.users.splice(index, 1)
  }
}

module.exports = UserService;
