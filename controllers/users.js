const express = require('express')
const router = express.Router();
const { User } = require('../models')
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

// router.get('/:email', (req, res) => {
//         User.find({ email: req.params.value })
//             .then((users) => {
//                 console.log('user', users);
//                 res.json({ users: users });
//             })
//             .catch(error => {
//                 console.log('error', error);
//                 res.json({ message: 'There was an issue please try again...' });
//             });
    
// });

module.exports = router