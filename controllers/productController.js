const { response, request  } = require('express');
const logger = require('@condor-labs/logger');
const productService = require('../service/productService');

const getProductByCode = async (req = request, res = response, next) => {
    const param = req.params.id;

    logger.info("Consultado productos con code :", param);
    try {
        const product = await productService.getProductByCode(param);
        logger.info("Product controller -->", product);
     
        if (product) {
            res.status(200).send({           
                product
            });
           }
        
        if (!product) {         
            res.status(404).send({
                product
            });
        }
    }  catch (error) {
        return next(error);
    }
}

const gellAllProduct = async (req = request, res = response, next) => {

    try {
    const { limite = 5, desde = 0 } = req.query;
    const products = await productService.gellAllProduct(Number(limite), Number(desde));

    if (products) {
            logger.info('Consultando productos', products.length);
            res.status(200).send({products});
        }
    } 
    
    catch (error) {
        return next(error);
    }
}

const updateProduct = async (req = request, res = response, next) => {
    const body = req.body;
    const { code } = body;
    
    logger.info("Actualizando :--->", body, code);
    
    try {
        const product = await productService.updateProduct(code, body);
        
        if (product) {
            
            res.status(200).send({product});
            
        }
        if (!product) {
            
            res.status(400).send({product});
        }

    }  catch (error) {
        return next(error);
    }

}

const saveProduct = async (req, res = response, next) => {

    const body = req.body;
    try {
        
        const productSave = await productService.saveProduct(body);
        console.log("Producto ", productSave);
        
        res.status(200).send({ productSave });

    }  catch (error) {
        return next(error);
    }
}
module.exports = {
gellAllProduct,
    getProductByCode,
    saveProduct,
    updateProduct
}