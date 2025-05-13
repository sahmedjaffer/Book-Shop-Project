const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        orderdate: {type: String , required: true},
        deliveryaddess: {type: String, required: true},
        paymentmethod: {type: String},
        status: {type: String},
        orderitem: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'OrderItem'
            }
        ],
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}

    },
    {
        timestamps: true
    }
)