const express = require('express');
const router = express.Router();
const {ProductsController} = require('./../controllers/product');
const upload= require("../middleware/upload");

router.get('/',ProductsController.getProduct);
router.get('/:id',ProductsController.getProductDetail);
router.put('/:id',upload.single('photo'),ProductsController.update);
router.post('/',upload.single('photo'),ProductsController.insert);
router.delete('/:id',ProductsController.delete);

module.exports = router;