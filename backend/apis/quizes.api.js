const express = require('express'),
      router  = express.Router(),
      lodash = require('lodash'),
      Category = require('../models/Category.model').Category,
      Quiz    = require('../models/Quiz.model').Quiz,
      isAuthenticated = require('../middleware/isAuthenticated');

router.get('/', async (req, res) => {
    try {
        const quizes = await Quiz.find({});
        res.status(200).json({message: "success", quizes});    
    } catch(err) {
        res.status(500).json({message: 'Unable to fetch quizes'});
    }
});

router.post('/', isAuthenticated, getCategory, async (req, res) => {
    const body = req.body.quiz;
    const category = req.category;
    try {
        const newQuiz = await Quiz.create(body);
        category.quizes.push(newQuiz);
        category.save();
        res.status(201).json({message: "success", quiz: newQuiz});
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Unable to save quiz"});
    }
});

router.get('/:quizId', isAuthenticated, async (req, res) => {
    res.status(200).json({message: "success", quiz: req.quiz});    
});

router.put('/:quizId', isAuthenticated, async (req, res) => {
    const body = req.body;
    let quiz = req.quiz;
    try {
        quiz = lodash.merge(quiz, body);
        quiz = await quiz.save();
        res.status(200).json({message: "success", quiz});
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Unable to save quiz"});
    }
})

router.delete('/:quizId', isAuthenticated, async (req, res) => {
    let quiz = req.quiz;
    try {
        await quiz.delete();
        res.status(200).json({message: "success", quiz});
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Unable to delete quiz"});
    }
});

router.param('quizId', async (req, res, next, quizId) => {
    try {
        const quiz = await Quiz.findById(quizId);
        if(quiz) {
            req.quiz = quiz;
            next();
        } else {
            res.status(500).json({ message: 'Unable to fetch quiz right now' });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

async function getCategory(req, res, next) {
    const categoryId = req.body.category;
    if(!categoryId) {
        return res.status(500).json({ message: 'Category is mandatory' });
    }
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
}

module.exports = router;
