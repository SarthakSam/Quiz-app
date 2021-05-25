const express = require('express'),
      router  = express.Router(),
      User    = require('../models/User.model').User,
      { getToken} = require('../middleware/token');

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username })
        if(user) {
            if(user.password === password) {
                res.status(200).json({ username, message: `Welcome ${username}`, authorization: getToken({ username }) });
            } else {
                res.status(500).json({ message: "Incorrect password" });
            }
        }
        else {
            res.status(500).json({ message: "Unable to fetch user with this username" });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Unable to fetch user", errorMessage: err._message  });
    }
});

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username })
        if(user) {
            res.status(500).json({ message: "User with this username already exists. Please use a unique username." });
        }
        else {
            const newUser = await User.create({ username, password });
            if(newUser) {
                res.status(200).json({ username: username, message: `Welcome ${username}`, authorization: getToken({ username })  });
            } else {
                res.status(500).json({ message: "Unable to create user right now" });
            }
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Unable to create user. Please try again.", errorMessage: err._message });
    }
});

module.exports = router;