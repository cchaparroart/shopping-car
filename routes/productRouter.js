const { Router } = require('express');
const router = Router();
const { check, param } = require('express-validator');
const { validarCampos } = require('../middlewares/valideMiddlewares');
const productController = require('../controllers/productController');

router.get('/:id',
    param('id', "Tiene que ser un numero ").isNumeric(), validarCampos, productController.getProductByCode);

router.get('/', productController.gellAllProduct);

router.post('/',
    check('code', 'El codigo del producto es obligatorio').notEmpty(),
    check('code', 'El codigo tienes que ser un numero de 9').isInt({ min: 10 }),
    check('name', 'El nombre es obliglatorio').notEmpty(),
    check('name', 'El nombre tiene que tener mas de dos caracteres').isLength({ min: 3 }),
    check('price', 'El precio es obligatorio').notEmpty(),
    check('price', 'El precio tiene que se mayor de 0').isInt({ min: 1 }),
    check('category', 'El campo categoria es obliglatorio').notEmpty(),
    check('category', 'Solo se puede la siguientes categorias: FOOD,TECH o TOYS').isIn(['FOOD', 'TECH', 'TOYS']),
    validarCampos,
    productController.saveProduct);

router.put('/',
    check('code', 'El codigo del producto es obligatorio').notEmpty(),
    check('code', 'El codigo tienes que ser un numero de 9').isInt({ min: 10 }),
    check('name', 'El nombre es obliglatorio').notEmpty(),
    check('name', 'El nombre tiene que tener mas de dos caracteres').isLength({ min: 3 }),
    check('price', 'El precio es obligatorio').notEmpty(),
    check('price', 'El precio tiene que se mayor de 0').isInt({ min: 1 }),
    check('category', 'El campo categoria es obliglatorio').notEmpty(),
    check('category', 'Solo se puede la siguientes categorias: FOOD,TECH o TOYS').isIn(['FOOD', 'TECH', 'TOYS']),
    productController.updateProduct);
    
module.exports = router;