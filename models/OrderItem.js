const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
    {
        quantity: {type: String, required:true},
        unitprice: {type: String, required: true},
        book: [
            {
            type: mongoose.Schema.Types.ObjectId, ref: 'Book'
        }
    ],
        order: { type: mongoose.Schema.Types.ObjectId,
             ref: 'Order', 
             required: true}
    }, {
        timestamps: true
    }
);

const OrderItem = mongoose.model('OrderItem', orderItemSchema);
module.exports = OrderItem;