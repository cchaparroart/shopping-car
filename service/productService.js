const productRepository = require('../repository/productRepository');
const logger = require('@condor-labs/logger');

const gellAllProduct = (limite,desde) =>  productRepository.getAllProducts(limite,desde);
const getProductByCode =  (code) => productRepository.getProductByCode(code);
const getProductById =  (id) => productRepository.getProductById(id);
const saveProduct = (product) => productRepository.saveProduct(product);
const updateProduct = (code, product) => productRepository.updateProduct(code, product);

module.exports = {
  gellAllProduct,
  getProductByCode,
  saveProduct,
  getProductById,
  updateProduct
};