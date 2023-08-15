const express = require('express');
const router = express.Router();
const {CategoryController} = require('./../controllers/category');

router.get('/',CategoryController.getCategory);
router.post('/',CategoryController.insert);
router.put('/:id',CategoryController.update);
router.delete('/:id',CategoryController.delete);
router.get('/:id',CategoryController.getCategoryById);

module.exports = router;