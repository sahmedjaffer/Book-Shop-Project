const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema(
    {
        name : {type: String, required:true},
        address: {type: String},
        website: {type: String},
        book:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book'
            }
        ],
        author : [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Author'
            }
        ]
    },
    {timestamps: true}
)