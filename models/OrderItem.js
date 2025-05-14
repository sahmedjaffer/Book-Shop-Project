const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
    {
        quantity: {type: String, required: true},
        unitPrice: {type: String, required: true},
        order: {type: mongoose.Schema.Types.ObjectId, ref:'Order'},
        Items: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book'
            }
        ]
    },
    {timestamps: true}
)

const OrderItem = mongoose.model('OrderItem', orderItemSchema);
module.exports = OrderItem
