const faker = require('faker');

function* generateFakeUsers(count = 100000) {
  for (let i = 0; i < count; i++) {
    yield {
      id: i + 1,
      name: faker.name.findName(),
      email: faker.internet.email(),
      city: faker.address.city(),
    };
  }
}

module.exports = { generateFakeUsers };