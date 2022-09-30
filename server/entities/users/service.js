const {faker} = require('@faker-js/faker');

class UserService {
    constructor() {
        this.users = [];
        this._generate();
    }
  
    async _generate(){
        for(let i = 0; i < 10; i++){
            this.users.push({
                id: (i + 1),
                email: faker.internet.email(),
                password: faker.internet.password(),
                profilePhoto: faker.image.avatar(),
                role: null,
                recoveryToken: null
            })
        }
    }

    async create(data) {
      return data;
    }
  
    async find() {
      return this.users;
    }
  
    async findOne(id) {
      return { id };
    }
  
    async update(id, changes) {
      return {
        id,
        changes,
      };
    }
  
    async delete(id) {
      return { id };
    }
  }
  
  module.exports = UserService;