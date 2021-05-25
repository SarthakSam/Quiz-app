const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    username: { type: String, required: 'username is mandatory', unique: 'Username already exists. Please try again with a diff username' },
    password: { type: String, required: 'password is mandatory' },
    quizes: [{ type: Schema.Types.ObjectId, ref: 'Quiz'}]
});

const User = model('User', UserSchema);

module.exports = { User, UserSchema };