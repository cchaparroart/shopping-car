const mongodb = require("@condor-labs/mongodb")();
const Schema = mongodb.mongoose.Schema;


const shopping_car = Schema({
   
    code: {
        type: String,
        required: true,
        unique: true
    },
    totalPrice: {
        type: String,
        required: true,
    },
    products: {
        type: [{code: { type: Number, ref: "Product" }, quantity: Number }],
        default: []
    },

});
const modelShoppingCars = mongodb.mongoose.model('shoppingCar', shopping_car);

module.exports = modelShoppingCars;