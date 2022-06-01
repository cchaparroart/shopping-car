const { Router } = require('express');
const router = Router();
const { check, param } = require('express-validator');
const { validarCampos } = require('../middlewares/valideMiddlewares');
const productController = require('../controllers/productController');
const { existeCategoriaPorId } = require('../helpers/bd-validor');

router.get('/:id',
    param('id', "Tiene que ser un numero ").isNumeric(), validarCampos, productController.getProductByCode);

router.get('/', productController.gellAllProduct);

router.post('/',
    check('code', 'El codigo del producto es obligatorio').notEmpty(),
    check('code', 'El codigo tiene que ser un string').isString(),
    check('code', 'El codigo tiene ser minimo 10').isLength({ min: 9 }),
    check('name', 'El nombre es obliglatorio').notEmpty(),
    check('name', 'El nombre tiene que tener mas de dos caracteres').isLength({ min: 3 }),
    check('price', 'El precio es obligatorio').notEmpty(),
    check('price', 'El valor tiene que se un entero').isNumeric(),
    check('category', 'El campo categoria es obliglatorio').notEmpty(),
    check('category').custom(existeCategoriaPorId),
    validarCampos,
    productController.saveProduct);

router.put('/',
    check('code', 'El codigo del producto es obligatorio').notEmpty(),
    check('code', 'El codigo tiene que ser un string').isString(),
    check('code', 'El codigo tiene ser minimo 10').isLength({ min: 9 }),
    check('name', 'El nombre es obliglatorio').notEmpty(),
    check('name', 'El nombre tiene que tener mas de dos caracteres').isLength({ min: 3 }),
    check('price', 'El precio es obligatorio').notEmpty(),
    check('price', 'El valor tiene que se un entero').isNumeric(),
    check('category', 'El campo categoria es obliglatorio').notEmpty(),
    check('category').custom(existeCategoriaPorId),validarCampos,
    productController.updateProduct);

module.exports = router;