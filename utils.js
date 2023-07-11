const { faker } = require('@faker-js/faker')

function parseValue(value) {
    let valueArray = value.toLowerCase().split("+");
    let parsedArray = valueArray.map((word) => {
        let wordArray = word.split("");
        wordArray[0] = " " + wordArray[0].toUpperCase();
        return wordArray.join("");
    });
    let parsedValue = parsedArray.join("").trim();
    return parsedValue;
}

function wait(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}

function createRandomUser() {
    return {
        fullName: faker.person.fullName(),
        email: faker.internet.email(),
        username: faker.internet.displayName(),
        birthdate: faker.date.birthdate(),
        location: faker.location.city(),
        avatar: faker.image.avatar()

    };
}

function createRandomRecipe() {
    return {
        name: faker.commerce.productName(),
        instructions: faker.lorem.paragraph(),
        alcoholic: true,
        location: faker.location.city(),
        image: faker.image.urlLoremFlickr({ category: 'food' }),
        glassType: faker.lorem.words(2),
        category: faker.lorem.word()
    };
}

function createRandomIngredient() {
    return {
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        type: faker.lorem.words(2),
        alcoholic: true
    }
}

module.exports = {
    parseValue,
    wait,
    createRandomUser,
    createRandomRecipe,
    createRandomIngredient
}

