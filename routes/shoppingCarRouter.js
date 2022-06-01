const { Router } = require('express');
const router = Router();
const { param, check } = require('express-validator');
const { validarCampos } = require('../middlewares/valideMiddlewares');
const shoppingCarController = require('../controllers/shoppingCarController');
const { existeProducto } = require('../helpers/bd-validor');

router.post('/',
    check('code', 'El codigo es obligatorio').notEmpty(),
    check('code', 'El codigo tiene que string').isString(),
    check('code', 'El codigo tiene que ser de minimo 2 caracteres').isLength({ min: 2 }),
    check('totalPrice', 'El valor total es obligatorio').notEmpty(),
    check('totalPrice', 'El valor total tiene que se mayor o igual 0').isInt({ min: 0 }),
    validarCampos, shoppingCarController.saveShoppingCar);

router.put('/', 
check('product').custom(existeProducto),
validarCampos,
shoppingCarController.appProducCarShopping);

router.get('/:id', param('id', "La id no es valida ").isMongoId(), validarCampos,
    shoppingCarController.getShoppingCarById);

module.exports = router;