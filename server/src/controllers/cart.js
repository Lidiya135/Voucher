const modelCarts = require('./../models/cart');
const {response} = require('../middleware/common');

const CartController = {

  getCart:(req,res,next) => {
    modelCarts.selectCart()
    .then((result)=> response(res, 200, true, result.rows, "get data success"))
    .catch((err)=> response(res, 404, false, err, "get data fail"))
  },

  get:(req,res,next) => {
    modelCarts.select()
    .then((result)=> response(res, 200, true, result.rows, "get data success"))
    .catch((err)=> response(res, 404, false, err, "get data fail"))
  },

  insert:(req,res, next) => {
    req.body.amount = parseInt(req.body.amount);
    req.body.price = parseInt(req.body.price);
    req.body.product_id = parseInt(req.body.product_id);
    modelCarts.insertCart(req.body)
    .then((result)=> response(res, 200, true, result.rows, req.body, "input data success"))
    .catch((err)=> response(res, 404, false, err, "input data fail"))
  },
  
  update:(req,res,next) => {
    console.log(req.params.id);
    req.body.amount = parseInt(req.body.amount);
    req.body.price = parseInt(req.body.price);
    // req.body.product_id = parseInt(req.body.product_id);
    modelCarts.updateCart(req.params.id, req.body)
    .then((result)=> response(res, 200, true, result.rows, "update data success"))
    .catch((err)=> response(res, 404, false, err, "update data fail"))
  },

  delete:(req,res,next) => {
    modelCarts.deleteCart(req.params.id)
    .then((result)=> response(res, 200, true, result.rows, "delete data success"))
    .catch((err)=> response(res, 404, false, err, "delete data fail"))
  },

  getCartById:(req,res,next) => {
    modelCarts.selectCartById(req.params.id)
    .then((result)=> response(res, 200, true, result.rows, "get data success"))
    .catch((err)=> response(res, 404, false, err, "get data fail"))
  },

  deletee:(req,res,next) => {
    modelCarts.deleteCartt()
    .then((result)=> response(res, 200, true, result.rows, "delete data success"))
    .catch((err)=> response(res, 404, false, err, "delete data fail"))
  },
};

exports.CartController = CartController;