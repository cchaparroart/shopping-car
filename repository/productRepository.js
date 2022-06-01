
const Product = require('./models/productEntity');
const dbSettings = require("../config/parameter");
const redis = require('@condor-labs/redis')(dbSettings.settingsRedis);
const logger = require('@condor-labs/logger');

const getAllProducts = (limite,desde) => Product.find().skip(desde).limit(limite);
const getProductByCode =  (code) => Product.findOne({ 'code': code });
const getProductById =  (id) => Product.findById(id);
const saveProduct = async (body) => {

    const product = new Product(body);
    const client = await redis.getClient();
    const productDbMongo = await product.save();
    await client.set(product.code, JSON.stringify(productDbMongo));
    return productDbMongo;
}
const updateProduct = (code, product) => Product.findOneAndUpdate({ 'code': code }, product);

module.exports = {
    getAllProducts,
    getProductByCode,
    saveProduct,
    updateProduct,
    getProductById
};