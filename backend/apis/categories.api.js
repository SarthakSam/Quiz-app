const express = require('express'),
      router  = express.Router(),
      Category = require('../models/Category.model').Category,
      isAuthenticated = require('../middleware/isAuthenticated');

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json({message: "success", categories});
    } catch(err) {
        console.log(err);
        res.status(500).json({message: 'Unable to fetch categories'});
    }
});

router.post('/', isAuthenticated, async (req, res) => {
    const body = req.body;
    try {
        const category = await Category.create(body);
        res.status(201).json({message: "success", category});
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Unable to create category"});
    }
});

router.get('/:quizId', async (req, res) => {
    res.status(200).json({message: "success", quiz: req.quiz});    
});

// router.put('/:quizId', async (req, res) => {
//     const body = req.body;
//     let quiz = req.quiz;
//     try {
//         quiz = lodash.merge(quiz, body);
//         quiz = await quiz.save();
//         res.status(200).json({message: "success", quiz});
//     } catch(err) {
//         console.log(err);
//         res.status(500).json({message: "Unable to save quiz"});
//     }
// })

router.delete('/:categoryId', isAuthenticated, async (req, res) => {
    const category = req.category;
    try {
        await category.delete();
        res.status(200).json({message: "success", category});
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Unable to delete category"});
    }
});

router.param('categoryId', async (req, res, next, categoryId) => {
    try {
        const category = await Category.findById(categoryId);
        if(category) {
            req.category = category;
            next();
        } else {
            res.status(500).json({ message: 'Unable to fetch category right now' });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

module.exports = router;
