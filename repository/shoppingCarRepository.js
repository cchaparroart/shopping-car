
const ShoppingCar = require('./models/shoppingCarEntity');
const getShoppingCarId = (id) => ShoppingCar.findById(id);

const saveShoppingCar = (shoppingCar) => {
    const sc = new ShoppingCar(shoppingCar);
    return sc.save();
}

const updateShoppingCar =  (id, shoppingCar) => {
    return  ShoppingCar.findByIdAndUpdate(id, shoppingCar);
}
module.exports = {
    getShoppingCarId,
    saveShoppingCar,
    updateShoppingCar
};