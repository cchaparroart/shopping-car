const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
    const erroValide = validationResult(req);
    if (!erroValide.isEmpty()) {
        return res.status('404').json({ erroValide });
    }
    next();
}

module.exports = { validarCampos }