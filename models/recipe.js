import mongoose from "mongoose";


const recipeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
    instructions: String,
    alcholic: {type: Boolean, required: true},
    image: String,
    createdBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    glassType: String,
    category: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
},{ timestamps:true })

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;