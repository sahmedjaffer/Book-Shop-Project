const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        title:{type: String , required:true},
        description:{type: String, required:true},
        unitprice: {type: String, required:true},
        stock: {type: String, required: true},
        image: {type: String},
        category: {type: String, required: true},
        publisher: {type: String, required: true},
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true},
        order: {type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true}
    },
    {timestamps: true}
);

const Book = mongoose.model('Book',bookSchema);
exports.model = Book;

