const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        title:{type: String , required:true},
        isbn:{type: String, required:true},
        description:{type: String, required:true},
        price: {type: String, required:true},
        stock: {type: String, required: true},
        image: {type: String},
        category: {type: String, required: true},
        publisher: {type: mongoose.Schema.Types.ObjectId,ref: 'Publisher'},
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'Author'},
        order: {type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem'}
    },
    {timestamps: true}
);

const Book = mongoose.model('Book',bookSchema);
module.exports= Book;

