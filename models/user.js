const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    // password: {type: String, required: true, validate: {len: {args:[8,99],}} },
    fullName: {type: String, required: true},
    birthdate: {type: Date, required: true},
    location: String,
    recipesByUser: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
    commentsByUser: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    following: Array,
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
    avatar: String
},{ timestamps:true })

const User = mongoose.model('User', userSchema);

module.exports = User;