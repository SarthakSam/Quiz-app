const { model, Schema } = require('mongoose'),
      QuestionSchema    = require('../models/Question.model').QuestionSchema;

const QuizSchema = new Schema({
    title: { type: String, required: 'Title cannot be empty' },
    description: String,
    image: String,
    questions: { type: [QuestionSchema], required: true, validate: {
        validator: function(v) {
          return v.length > 0;
        },
        message: props => `${props.value} length should be greater than 2`
      }, }
});

const Quiz = model('Quiz', QuizSchema);

module.exports = { Quiz, QuizSchema };