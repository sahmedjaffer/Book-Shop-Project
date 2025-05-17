const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        isbn:{type: String, required:true},
        title:{type: String , required:true},
        description:{type: String, required:true},
        unitPrice: {type: Number, required:true},
        stock: {type: Number, required: true},
        image: {type: String},
        category: {type: String, required: true},
        publisher: {type: String, required: true},
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'Author'},
        order: {type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem'}
    },
    {timestamps: true}
);

const Book = mongoose.model('Book',bookSchema);
module.exports= Book;

