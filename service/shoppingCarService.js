const shoppingCarRepository = require('../repository/shoppingCarRepository');
const productRepository = require('../repository/productRepository');
const logger = require('@condor-labs/logger');
const { log } = require('@condor-labs/logger');

const getShoppingCarById = (code) => shoppingCarRepository.getShoppingCarId(code);
const saveShoppingCar = (shopping_car) => shoppingCarRepository.saveShoppingCar(shopping_car);

const addProductCar = async (cod, productsAdd) => {
  try {
    ///Busco el carrito de compras
    logger.info("Agregando -> :", productsAdd);
    const shoppingCarBd = await shoppingCarRepository.getShoppingCarId(cod);
    logger.info("Carro Creado con productos -> :", shoppingCarBd.products);

    const prodNew = [];

    if (shoppingCarBd) {
      const { products } = shoppingCarBd;
      logger.info("actual tamaño",products.length)
      if (products.length > 0) {

        for (const prodPar of productsAdd) {
          for (const prodOld of products) {
            logger.info("-----> prodPar" + prodPar, "prodPar" + prodOld)
            if (prodOld.code = prodPar.code) {

              prodNew.push(prodPar);
            } else {
              prodNew.push(prodOld);
            }
          }
        }
        shoppingCarBd.products = prodNew;
      }
      else {
        shoppingCarBd.products = productsAdd;

      }
      logger.info("Arreglo de productos : -> ", prodNew);


      logger.info("Nuevo Carrito -> ", shoppingCarBd);

      return await shoppingCarRepository.updateShoppingCar(cod, shoppingCarBd);
    }
    else {

      throw new Error('El carrito de compras no existe');
    }

  } catch (error) {

    throw error;
  }
}
const deleteProductCar = (cod, products) => productRepository.updateProduct(code, product);

module.exports = {
  getShoppingCarById,
  saveShoppingCar,
  addProductCar
};