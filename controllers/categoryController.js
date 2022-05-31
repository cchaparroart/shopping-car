const { response, request } = require('express');
const logger = require('@condor-labs/logger');
const categoryService = require('../service/categoryService');


const getCategoryByCode = async (req = request, res = response) => {
    const param = req.params.id;

    logger.info("Consultado categoria :", param);
    try {
        const category = await categoryService.getCategoryByCode(param);
        logger.info("category controller", category);
        //Si existe
        if (category) {
            res.status('200').json({
                msg: 'Consultando category por code',
                category,
            });
        }
        //Si es un numero valido pero no existe
        if (!category) {
            logger.err('No se encontro el producto',);
            res.status('404').json({
                msg: "Category no encontrado"
            });
        }
    } catch (error) {


        if (error.name === 'MongoError') {
            res.status('400').json({
                code: error.code,
                name: error.name,
                msg:  error.message
            });
        }

    
        res.status('500').json({
            msg: error.message
        });
    }
}

const updateCategory = async (req = request, res = response) => {
    const body = req.body;
    const { code } = body;
    logger.info("Actualizando :--->", body, code);
    try {
        const category = await categoryService.updateCategory(code, body);
        if (category) {
            res.status('200').json({
                msg: 'Categoria actualizada',
                category,
            });
            logger.info(category);
        }
        if (!category) {
            logger.err('Categoria no existe',);
            res.status('400').json({
                msg: "Categoria no encontrado"
            });
        }
    } catch (error) {
       
        if (error.name === 'MongoError') {
            res.status('400').json({
                code: error.code,
                name: error.name,
                msg:  error.message
            });
        }


        res.status('500').json({
            msg: error.message
        });
    }
}

const saveCategory = async (req, res = response) => {

    const body = req.body;
    
        const categorySave = await categoryService.saveCategory(body);

        console.log("Entre al post", categorySave);
        res.status('200').json({
            msn: 'Catogoria guardado',
            categorySave,
        });


}


const gellAllCategory = async (req = request, res = response) => {

    try {
        const { limite = 5, desde = 0 } = req.query;
        const categorys = await categoryService.gellAllCategory(Number(limite), Number(desde));

        if (categorys) {

            logger.info('Consultando todas la categorias', categorys.length);
            res.status('200').json({
                msg: 'Consultado todas la categorias',
                categorys,
            });
        }

    } catch (error) {

        if (error.name === 'MongoError') {
            res.status('400').json({
                code: error.code,
                name: error.name,
                msg:  error.message
            });
        }

        logger.err('Error interno',);
        res.status('500').json({
            msg: error,

        });
    }
}

module.exports = { getCategoryByCode, updateCategory, gellAllCategory, saveCategory }