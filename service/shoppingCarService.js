const shoppingCarRepository = require('../repository/shoppingCarRepository');
const productRepository = require('../repository/productRepository');
const logger = require('@condor-labs/logger');

const getShoppingCarById = (code) => shoppingCarRepository.getShoppingCarId(code);
const saveShoppingCar = (shopping_car) => shoppingCarRepository.saveShoppingCar(shopping_car);

const addProducShoppingCar = async (shoppingCarId, productQuantity) => {

  logger.info('Agregando los siguiente --->', shoppingCarId, productQuantity);

  const shoppingCar = await shoppingCarRepository.getShoppingCarId(shoppingCarId);
  const product = await productRepository.getProductById(productQuantity._id);
  logger.info('shoppingCar --->', shoppingCar);
  logger.info('product --->', product);
  logger.info('productQuantity --->', productQuantity);
  const itemShopping = {

    '_id': product._id,
    'quantity': productQuantity.quantity
  }

  shoppingCar.products.push(itemShopping);
  logger.info('ShoppingCar nuevo --->', shoppingCar);
  const shoppingCarNew = await shoppingCarRepository.updateShoppingCar(shoppingCarId, shoppingCar);
  return shoppingCarNew;
};

module.exports = {
  getShoppingCarById,
  saveShoppingCar,
  addProducShoppingCar
};