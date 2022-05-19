const { Router } = require('express');
const router = Router();

const shoppingCarController= require('../controllers/shoppingCarController');

router.post('/', shoppingCarController.saveShoppingCar);
router.put('/', shoppingCarController.appProducCarShopping);
router.get('/:id', shoppingCarController.getShoppingCarById);

module.exports = router;