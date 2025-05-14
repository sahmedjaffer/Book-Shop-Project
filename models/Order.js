const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        orderDate: {type: String , required: true},
        status: {type: String},
        deliveryAddress: {type: String, required: true},
        unitQuantity: {type: String, required:true},
        unitPrice: {type: String, required: true},
        totalPrice:{type: String, required: true},
        items: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book'
            }
        ],
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
    },
    {
        timestamps: true
    }
)

const Order = mongoose.model('Order',orderSchema);
module.exports= Order;