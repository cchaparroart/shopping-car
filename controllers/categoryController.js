const { response, request } = require('express');
const logger = require('@condor-labs/logger');
const categoryService = require('../service/categoryService');

const getCategoryByCode = async (req = request, res = response, next) => {

    const param = req.params.id;
    logger.info("Consultado categoria :", param);

    try {
        const category = await categoryService.getCategoryByCode(param);
        logger.info("Se encontro la categoria :", category);

        if (category) {
            res.status(200).send({
                category
            });
        }

        if (!category) {
            logger.err('No se encontro el producto',);
            res.status(404).send({
                category
            });
        }
    }
    catch (error) {
        return next(error);
    }
}

const updateCategory = async (req = request, res = response, next) => {

    const body = req.body;
    const { code } = body;

    logger.info("Actualizando :--->", body, code);
    try {
        const category = await categoryService.updateCategory(code, body);
        if (category) {
            res.status(200).send({
                category
            });
            logger.info(category);
        }
        if (!category) {

            res.status(400).send({
                msg: "Categoria no encontrado"
            });
        }
    } catch (error) {
        return next(error);
    }

}

const saveCategory = async (req, res = response, next) => {

    try {

        const body = req.body;
        const categorySave = await categoryService.saveCategory(body);

        console.log("Se guardo la categoria", categorySave);
        res.status(200).send({
            categorySave
        });

    } catch (error) {

        return next(error);
    }
}


const gellAllCategory = async (req = request, res = response, next) => {

    try {
        const { limite = 5, desde = 0 } = req.query;
        const categorys = await categoryService.gellAllCategory(Number(limite), Number(desde));

        if (categorys) {

            logger.info('Consultando todas la categorias :', categorys.length);
            res.status(200).send({
                categorys
            });
        }

    } catch (error) {

        return next(error);
    }


}

module.exports = { getCategoryByCode, updateCategory, gellAllCategory, saveCategory }