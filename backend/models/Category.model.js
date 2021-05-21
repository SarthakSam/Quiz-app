const { model, Schema } = require('mongoose');

const CategorySchema = new Schema({
    title: { type: String, required: 'Title is mandatory' },
    image: String,
    quizes: { type: Schema.Types.ObjectId, ref: 'Quiz' }
});

const Category = model('Category', CategorySchema);

module.exports = { Category, CategorySchema };