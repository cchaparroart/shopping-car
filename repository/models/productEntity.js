const mongodb = require("@condor-labs/mongodb")();
const Schema = mongodb.mongoose.Schema;
const product = Schema({
    
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
        type: Schema.Types.ObjectId,
        required: true,
        ref:'Category'  
    },
});
module.exports  = mongodb.mongoose.model('Product', product);
