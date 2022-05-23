const { Router } = require('express');
const router = Router();
const { check, param, body } = require('express-validator');
const { validarCampos } = require('../middlewares/valideMiddlewares')

const shoppingCarController = require('../controllers/shoppingCarController');

router.post('/',
    body('code', 'El codigo es obligatorio').notEmpty,
    body('code', 'El codigo tiene que string').isString(),
    body('code', 'El codigo tiene que ser de minimo 2 caracteres').isLength({ min: 2 }),
    body('totalPrice', 'El valor total es obligatorio').notEmpty(),
    body('totalPrice', 'El valor total tiene que se mayor a 0').isInt({ min: 1 }),
    validarCampos, shoppingCarController.saveShoppingCar);
router.put('/', shoppingCarController.appProducCarShopping);
router.get('/:id', param('id', "La id no es valida ").isMongoId, validarCampos,
    shoppingCarController.getShoppingCarById);

module.exports = router;