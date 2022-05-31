const { response, request } = require('express');
const shoppingCarService = require('../service/shoppingCarService');
const logger = require('@condor-labs/logger');

const saveShoppingCar = async (req, res = response, next) => {
    const body = req.body;
    try {
        const shoppingCar = await shoppingCarService.saveShoppingCar(body);
        logger.info('Se guardo con existo el carrito de compras', shoppingCar);

        if (shoppingCar) {
            res.status(200).send({
                shoppingCar
            });
        }
    } catch (error) {
        return next(error);
    }
}

const appProducCarShopping = async (req, res = response, next) => {

    const body = req.body;
    const { id } = body;
    const { product } = body;

    logger.info("Add los productos al carrito", id, product);

    try {

        const shoppingCar = await shoppingCarService.addProducShoppingCar(id, product);

        if (shoppingCar) {
            res.status(200).send({ shoppingCar });

            logger.info('Se agregaron los productos al carrito', shoppingCar);
        }
    } catch (error) {
        return next(error);
    }
}

const getShoppingCarById = async (req = request, res = response) => {

    const param = req.params.id;
    logger.info("Consultado el carrrito con code :", param);
    try {

        const shoppingCar = await shoppingCarService.getShoppingCarById(param);
        logger.info(shoppingCar);

        if (shoppingCar) {

            res.status(200).send({ shoppingCar });

        }

        if (!shoppingCar) {
            logger.err('No se encontro el producto',);
            res.status(400).send({ shoppingCar });
        }
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    saveShoppingCar, appProducCarShopping, getShoppingCarById
};