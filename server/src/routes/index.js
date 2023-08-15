const express = require('express');
const router = express.Router();
const CategoryRouter = require('../routes/category');
const ProductRouter = require('../routes/product');
const CartRouter = require('../routes/cart');
const UserRouter = require('../routes/user');

router.use('/category', CategoryRouter);
router.use('/product', ProductRouter);
router.use('/cart', CartRouter);
router.use('/user', UserRouter);

module.exports = router;