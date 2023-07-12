require('dotenv').config();
const axios = require('axios');
const { Recipe, Ingredient } = require('../models');
const { wait, firstLettersCapitalized } = require('../utils');

// Recipe.deleteMany({})
// .then(result => console.log(result));
async () => {
    // Get list of all alcoholic drink names from API
    axios.get(`${process.env.API}/filter.php?a=Alcoholic`)
    .then(async response => {
        let drinkIds = [];
        let drinks = response.data.drinks;
        let numDrinks = drinks.length;
        for (let i = 0; i < numDrinks; i++) {
            drinkIds.push(drinks[i].idDrink);
        }

        // Get list of all non-alcoholic drink names from API
        axios.get(`${process.env.API}/filter.php?a=Non_Alcoholic`)
        .then(async response => {
            let drinks = response.data.drinks;
            let numDrinks = drinks.length;
            for (let i = 0; i < numDrinks; i++) {
                drinkIds.push(drinks[i].idDrink);
            }

            drinkIds.forEach(async id => {
                axios.get(`${process.env.API}/lookup.php?i=${id}}`)
                .then(async response => {
                    let drink = response.data.drinks[0];
                    
                    let newDrink = {
                        name: drink.strDrink,
                        alcoholic: drink.strAlcoholic === 'Alcoholic' ? true: false,
                        image: drink.strDrinkThumb,
                        glassType: drink.strGlass,
                        category: drink.strCategory
                    }
                    await Recipe.create(newDrink)
                    .then(async createdDrink => {
                        for (let i = 1; i <= 15; i++) {
                            let ingredient = drink[`strIngredient${i}`];
                            if (ingredient) {
                                // given name, get ingredient from mongoose
                                await Ingredient.findOne({ name: firstLettersCapitalized(drink[`strIngredient${i}`])})
                                .then(ingredient => {
                                    createdDrink.ingredients.push(ingredient);
                                    createdDrink.measures.push(drink[`strMeasure${i}`]);
                                })
                                .catch(err => console.log(err.message));
                            }
                        }
                        createdDrink.save()
                        .then(savedDrink => console.log(savedDrink.name))
                        .catch(err => console.log(err.message));
                    })
                })
                .catch(err => console.log(err.message));
                await wait(500);
            });
        })
        .catch(err => console.log(err.message));
    })
    .catch(err => console.log(err.message));
}