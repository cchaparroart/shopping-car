const { validationResult } = require('express-validator');
const logger = require('@condor-labs/logger');

const validarCampos = (req, res, next) => {
    const error = validationResult(req);
    logger.error(
        JSON.stringify({
            method: req.method,
            url: req.url,
            error: {
                message: error.message,
                stack: error.stack,
            },
            params: req.params,
            headers: req.headers,
            querys: req.query,
        })
    );
    if (!error.isEmpty()) {

        return res.status(404).send({ error });
    }
    next();
}

const valideError = (error, req, res, next) => {
    
    if (error.name === 'MongoError') {
        return res.status(400).send({ errors: error.message });
    }
 
    return res.status(500).send({ errors: error.message });
    next(error);
     
}

module.exports = { validarCampos, valideError }