const mongoose = require('mongoose');
const authorSchema = new mongoose.Schema(
    {
        name:{type: String, required: true},
        biography: {type: String},
        nationality: {type: String},
        works: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}]
    },
    {
        timestamps: true
    }
);

const Author = mongoose.model('Author', authorSchema);

module.exports= Author;