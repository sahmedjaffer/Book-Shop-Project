const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        first:{type: String, required: true},
        last: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        address: {type: String, required: true},
        phone: {type: String, required: true},
        role:{type: mongoose.Schema.Types.ObjectId, ref: 'Role'},
        order : [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Order'
            }
        ]
    },
    {
        timestamps: true
    }
)


const User = mongoose.model('User',userSchema);
module.exports = User;