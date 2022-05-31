const { validationResult } = require('express-validator');
const logger = require('@condor-labs/logger');

const validarCampos = (req, res, next) => {
    
    const erroValide = validationResult(req);
   
    if (!erroValide.isEmpty()) {

        logger.error("---->",erroValide);
        return res.status('404').json({ erroValide });     
    }
  
    next();
}


const valideError =  (err, req, res, next) =>{

    logger.info('Valida ---Error');

    if (err.name === 'MongoError') {
        return res.status('400').json({
            code: err.code,
            name: err.name,
            msg: err.message
        });
    }

    return res.status('500').json({
        msg: err.message
    });

    next(err);
}

module.exports = { validarCampos, valideError}