const { faker } = require('@faker-js/faker');

function generateRandomData() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const zipCode = faker.location.zipCode();

    return { firstName, lastName, zipCode };
}

module.exports = { generateRandomData };
