const express = require('express'),
      router  = express.Router(),
      lodash = require('lodash'),
      Quiz    = require('../models/Quiz').Quiz;

router.get('/', async (req, res) => {
    try {
        const quizes = await Quiz.find({});
        res.status(200).json({message: "success", quizes});    
    } catch(err) {
        res.status(500).json({message: 'Unable to fetch quizes'});
    }
});

router.post('/', async (req, res) => {
    const body = req.body;
    try {
        const newQuiz = await Quiz.create(body);
        res.status(201).json({message: "success", quiz: newQuiz});
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Unable to save quiz"});
    }
});

router.get('/:quizId', async (req, res) => {
    res.status(200).json({message: "success", quiz: req.quiz});    
});

router.put('/:quizId', async (req, res) => {
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

router.delete('/:quizId', async (req, res) => {
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

module.exports = router;
