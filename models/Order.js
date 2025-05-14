const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        orderdate: {type: String , required: true},
        deliveryaddess: {type: String, required: true},
        paymentmethod: {type: String},
        status: {type: String},
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
exports.model = Order;