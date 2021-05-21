const { model, Schema } = require('mongoose'),
      OptionSchema = require('../models/Option.model').OptionSchema;

const QuestionSchema = new Schema({
    question: { type: String, required: 'Question statement is mandatory' },
    points: { type: Number, required: 'Points is mandatory' },
    negativePoints: Number,
    explanation: String,
    options: [OptionSchema]
});

const Question = model('Question', QuestionSchema);

module.exports = { Question, QuestionSchema };