require('dotenv').config();
const axios = require('axios');
const { Recipe, Ingredient } = require('../models');
const { wait } = require('../utils');

// Recipe.deleteMany({})
// .then(result => console.log(result));

// Get list of all ingredients names from API
axios.get(`${process.env.API}/search.php?f=a`)
.then(async response => {

})
.catch(err => console.log(err.message));