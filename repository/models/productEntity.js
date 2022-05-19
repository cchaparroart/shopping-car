const mongodb = require("@condor-labs/mongodb")();
const product = mongodb.mongoose.Schema({
    
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['FOOD', 'TECH', 'TOYS']
    },
});
module.exports  = mongodb.mongoose.model('Product', product);
