const mongodb = require("@condor-labs/mongodb")();
const Schema = mongodb.mongoose.Schema;

const producItem = Schema({
    _id: { type: Schema.Types.ObjectId, ref: "Product" },
    quantity: {
        type: Number,
        required: true,
        min: [1, "La cantidad del producto tiene que ser minimo de 1"]
    }
}
)
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
        type: [producItem],
        default: []
    },

});
const modelShoppingCars = mongodb.mongoose.model('shoppingCar', shopping_car);

module.exports = modelShoppingCars;