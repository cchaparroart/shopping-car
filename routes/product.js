const { Router } = require('express');
const router = Router();

const productController= require('../controllers/productController');

router.get('/:id', productController.getProductByCode);
router.get('/', productController.gellAllProduct);
router.post('/', productController.saveProduct);
router.put('/', productController.updateProduct);


module.exports = router;