const express = require('express')
const router = express.Router();
const { User } = require('../models')
const moment = require('moment')
const { parseValue } = require('../utils')

router.get('/', (req, res) => {
    User.find({})
    .then((users) => {
        return res.json({ users: users });
    })
    .catch(error => {
        console.log('error', error);
        res.json({ message: 'There was an issue please try again...'})
    })
})

router.get('/:field/:value', (req, res) => {
    let field = req.params.field
    let value = req.params.value
    console.log('field', 'value', field, value)
    // let query = {}
    // query[field]=value
    
    User.find({ [field]:[value] })
    .then((user) => {
        console.log("user", user)
        return res.json({ user: user })
    })
    .catch(error => {
        console.log('error', error);
        res.json({ message: 'There was an issue please try again...' });
    });
})

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
    .then((user) => {
        console.log('user found')
        return res.json({ user: user})
    })
    .catch(error => {
        console.log('error', error);
        res.json({ message: 'There was an issue please try again...' });
    });
})

router.get('/:email', (req, res) => {
        User.find({ email: req.params.value })
            .then((users) => {
                console.log('user', user);
                res.json({ user: user });
            })
            .catch(error => {
                console.log('error', error);
                res.json({ message: 'There was an issue please try again...' });
            });
    
});

router.post('/new', (req, res) => {
    console.log('data from request(user)', req.body);
    User.findOne({ email: req.body.email })
    .then((user) => {
        if (user) {
            res.json({ message: `${user.email} already exists. Please try again`})
        } else {
            User.create({
                email: req.body.email,
                username: req.body.username,
                fullName: req.body.fullName,
                // birthdate: new Date(),
                birthdate: moment(req.body.birthdate).format('YYYY-MM-DD'),
                location: req.body.location,
                recipesByUser: req.body.recipesByUser,
                commentsByUser: req.body.commentsByUser,
                following: req.body.following,
                favorites: req.body.favorites,
                avatar: req.body.avatar
            })
            .then((newUser) => {
                console.log('new user created =>', newUser);
                return res.json({ user: newUser });
            })
            .catch((error) => {
                console.log('error', error);
                return res.json({ message: 'error occured, please try again.' });
            });
        }
    })
    .catch((error) => {
        console.log('error', error);
        return res.json({ message: 'error occured, please try again.' });
    });
})

router.put('/:id', (req, res) => {
    const updateQuery = {};
    // check fullName
    if (req.body.fullName) {
        updateQuery.fullName = req.body.fullName;
    }
    // check username
    if (req.body.username) {
        updateQuery.username = req.body.username;
    }
    // check email
    if (req.body.email) {
        updateQuery.email = req.body.email;
    }
    // check recipesByUser
    if (req.body.recipesByUser) {
        updateQuery.recipesByUser = req.body.recipesByUser;
    }
    // check birthdate
    if (req.body.birthdate) {
        updateQuery.birthdate = req.body.birthdate;
    }
    // check location
    if (req.body.location) {
        updateQuery.location = req.body.location;
    }
    // check avatar
    if (req.body.avatar) {
        updateQuery.avatar = req.body.avatar;
    }
    // check commentsByUser
    if (req.body.commentsByUser) {
        updateQuery.commentsByUser = req.body.commentsByUser;
    }
    // check following
    if (req.body.following) {
        updateQuery.following = req.body.following;
    }
    // check favorites
    if (req.body.favorites) {
        updateQuery.favorites = req.body.favorites;
    }


    User.findByIdAndUpdate(req.params.id, { $set: updateQuery }, { new: true })
        .then((user) => {
            return res.json({ message: `${user.email} was updated`, user: user });
        })
        .catch((error) => {
            console.log('error inside PUT /users/:id', error);
            return res.json({ message: 'error occured, please try again.' });
        });
});

router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then((user) => {
            return res.json({ message: `${user.email} was deleted`, user: user });
        })
        .catch((error) => {
            console.log('error inside DELETE /users/:id', error);
            return res.json({ message: 'error occured, please try again.' });
        });
});

module.exports = router