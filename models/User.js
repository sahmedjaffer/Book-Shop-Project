const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstname:{type: String, required: true},
        lastname: {type: String, required: true},
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
    }
)


const User = mongoose.model('User',userSchema);
exports.model = User;