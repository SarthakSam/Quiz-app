const { model, Schema } = require('mongoose');

const OptionSchema = new Schema({
    name: { type: String, required: 'Name is mandatory' },
    isCorrect: { type: Boolean, default: false }
});

const Option = model('Option', OptionSchema);

module.exports = { Option, OptionSchema };