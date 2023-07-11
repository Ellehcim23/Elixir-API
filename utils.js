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

function createRandomUser() {
    let fullName = faker.person.fullName();
    //split the faker email
    // let emailSplit = faker.internet.email().split('@');
    // let email = firstName + '.' + lastName + '@' + emailSplit[1];
    // let email = faker.internet.email();
    // console.log(email);

    return {
        fullName: fullName,
        email: faker.internet.email(),
        username: 'fakerson1',
        birthdate: faker.date.birthdate(),
        location: "LA",
        avatar: faker.image.avatar()

    };
}

function createRandomRecipe() {
    return {
        name: 'Manhattan',
        instructions: 'Mix it Mix it Mix',
        alcholic: true,
        location: "New York",
        image: faker.image.urlLoremFlickr({ category: 'food' }),
        glassType: 'shot glass',
        category: 'cocktail'
    };
}

function createRandomIngredient() {
    return {
        name: "Whiskey",
        description: "All scotch is Whiskey",
        type: "Alcohol??",
        alcholic: true
    }
}

module.exports = {
    parseValue,
    createRandomUser,
    createRandomRecipe,
    createRandomIngredient
}

