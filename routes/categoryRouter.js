const { Router } = require('express');
const router = Router();
const { check, param } = require('express-validator');
const { validarCampos ,valideError } = require('../middlewares/valideMiddlewares')
const categoryController = require('../controllers/categoryController');

router.get('/:id',
    param('id', "Codigo tiene que ser un string").isString(),
    param('id', "Codigo mayor a 2 ").isLength({ min: 4 })
    , validarCampos, categoryController.getCategoryByCode);

router.post('/',
    check('code', "Codigo no valido String ").isString(),
    check('code', "Codigo > 3").isLength({ min: 4 }),
    check('describe', 'Descripcion obligatoria').notEmpty(),
    check('describe', "Descripcion > 3").isLength({ min: 4 }),
    validarCampos,
    categoryController.saveCategory);

router.put('/',
    check('code', "Codigo no valido String ").isString(),
    check('code', "Codigo > 3").isLength({ min: 4 }),
    check('describe', 'Descripcion obligatoria').notEmpty(),
    check('describe', "Descripcion > 3").isLength({ min: 4 }),
    validarCampos,
    categoryController.updateCategory);

router.get('/', categoryController.gellAllCategory);

module.exports = router;