
const Product = require('./models/productEntity');
const dbSettings = require("../config/parameter");
const redis = require('@condor-labs/redis')(dbSettings.settingsRedis);
const logger = require('@condor-labs/logger');

const getAllProducts = () => Product.find();
const getProductByCode = async (code) => Product.findOne({ 'code': code });

    /**const client = await redis.getClient();
    client.get(code, function (err, product) {
        if (err) {
            throw err;
        }
        if (product) {
            product = JSON.parse(product);
            logger.info("Return desde el cache ----> ",product);
            return product;
            
        }
        logger.info("Return desde el mongo");
        */

const saveProduct = async (body) => {

    const product = new Product(body);
    const client = await redis.getClient();
    const productDbMongo =await product.save();
    await client.set(product.code, JSON.stringify(productDbMongo));
    return productDbMongo;
}
const updateProduct = (code, product) => Product.findOneAndUpdate({ 'code': code }, product);

module.exports = {
    getAllProducts,
    getProductByCode,
    saveProduct,
    updateProduct
};