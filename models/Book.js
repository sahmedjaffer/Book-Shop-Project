const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        title:{type: String , required:true},
        description:{type: String, required:true},
        price: {type: String, required:true},
        stock: {type: String, required: true},
        image: {type: String},
        gener: {type: String, required: true},
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true},
        orderItem: {type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem', required: true}
    },
    {timestamps: true}
);

const Book = mongoose.model('Book',bookSchema);
exports.model = Book;

