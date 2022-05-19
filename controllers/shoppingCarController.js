const { response, request } = require('express');
const shoppingCarService = require('../service/shoppingCarService');
const logger = require('@condor-labs/logger');

const saveShoppingCar = async (req, res = response) => {
    const body = req.body;
    try {
        const shoppingCar = await shoppingCarService.saveShoppingCar(body);
        if (shoppingCar) {
            res.status('200').json({
                msn: 'Carrito de compras guardado',
                shoppingCar,
            });
            logger.info('Se guardo con existo el carrito de compras', shoppingCar);
        }
    } catch (error) {
        res.status('500').json({
            msn: 'Error al guardar el shoppingCar',
            err: error.message
        });
    }
}

const appProducCarShopping = async (req, res = response) => {

    const body = req.body;
    const { id } = body;
    const { products } = body;

    logger.info("Add los productos al carrito", id, products);

    try {

        const shoppingCar = await shoppingCarService.addProductCar(id, products);

        if (shoppingCar) {
            res.status('200').json({
                msn: 'Se agregaron los productos al carrito',
                shoppingCar,
            });
            logger.info('Se agregaron los productos al carrito', shoppingCar);
        }
    } catch (error) {
        res.status('500').json({
            msn: 'Error al guardar el shoppingCar',
            err: error.message
        });
    }
}



const getShoppingCarById = async (req = request, res = response) => {

    const param = req.params.id;
    logger.info("Consultado el carrrito con code :", param);
    try {

        const shoppingCar = await saveShoppingCar.getShoppingCarById(param);

        if (shoppingCar) {
            res.status('200').json({
                msg: 'Consultado el carrito',
                shoppingCar,
            });
            logger.info('%s %s', shoppingCar.code, shoppingCar.name);
        }

        if (!shoppingCar) {
            logger.err('No se encontro el producto',);
            res.status('400').json({
                msg: "Pruducto no encontrado"
            });
        }
    } catch (error) {

        logger.err('Error interno',);
        res.status('500').json({
            msg: error.message
        });
    }
}

module.exports = {
    saveShoppingCar, appProducCarShopping, getShoppingCarById
};