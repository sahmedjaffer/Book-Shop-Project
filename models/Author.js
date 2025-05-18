const mongoose = require('mongoose');
const authorSchema = new mongoose.Schema(
    {
        name:{type: String, required: true},
        biography: {type: String},
        works: [{type: mongoose.Schema.Types.ObjectId, ref: 'author'}]
    },
    {
        timestamps: true
    }
);

const Author = mongoose.model('Author', authorSchema);

module.exports= Author;