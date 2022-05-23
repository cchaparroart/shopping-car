const { response, request } = require('express');
const logger = require('@condor-labs/logger');
const productService = require('../service/productService');


const getProductByCode = async (req = request, res = response) => {

    const param = req.params.id;
    logger.info("Consultado productos con code :", param);
    try {
      
      
        const product = await productService.getProductByCode(param);
        logger.info("Produc controller", product);
        //Si existe
        if (product) {
            res.status('200').json({
                msg: 'Consultado producto por codigo',
                product,
            });
            logger.info('%s %s', product.code, product.name);
        }
        //Si es un numero valido pero no existe
        if (!product) {
            logger.err('No se encontro el producto',);
            res.status('404').json({
                msg: "Pruducto no encontrado"
            });
        }
        //Validacion de formato
      


    } catch (error) {

        logger.err('Error interno',);
        res.status('500').json({
            msg: error.message
        });
    }
}

const gellAllProduct = async (req = request, res = response) => {

    try {
        const products = await productService.gellAllProduct();

        if (products) {

            logger.info('Consutlado productos', products.length);
            res.status('200').json({
                msg: 'Consultado todos los productos',
                products,
            });
        }

    } catch (error) {
        logger.err('Error interno',);
        res.status('500').json({
            msg: error.message
        });
    }
}


const updateProduct = async (req = request, res = response) => {
    const body = req.body;
    const { code } = body;
    logger.info("Actualizando :--->", body, code);
    try {
        const product = await productService.updateProduct(code, body);
        if (product) {
            res.status('200').json({
                msg: 'Procuto Actualizado',
                product,
            });
            logger.info(product.code, product.name);
        }
        if (!product) {
            logger.err('Producto no existe',);
            res.status('400').json({
                msg: "Pruducto no encontrado"
            });
        }

    } catch (error) {
        logger.err('Error interno', error);
        res.status('500').json({
            msg: error.message
        });

    }

}

const saveProduct = async (req, res = response) => {

    const body = req.body;
    try {
        const productSave = await productService.saveProduct(body);

        console.log("Entre al post", productSave);
        res.status('200').json({
            msn: 'Producto guardado',
            productSave,
        });

    } catch (error) {

        res.status('500').json({
            msn: error.message

        });

    }

}
module.exports = {
    gellAllProduct,
    getProductByCode,
    saveProduct,
    updateProduct
}