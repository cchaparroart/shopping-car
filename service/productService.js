const productRepository = require('../repository/productRepository');
const logger = require('@condor-labs/logger');

const gellAllProduct = () =>  productRepository.getAllProducts();
const getProductByCode =  (code) => productRepository.getProductByCode(code);
const saveProduct = (product) => productRepository.saveProduct(product);
const updateProduct = (code, product) => productRepository.updateProduct(code, product);

module.exports = {
  gellAllProduct,
  getProductByCode,
  saveProduct,
  updateProduct
};