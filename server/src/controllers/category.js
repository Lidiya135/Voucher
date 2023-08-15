const modelCategory = require('./../models/category');
const {response} = require('../middleware/common');

const CategoryController = {

  getCategory:(req,res,next) => {
    modelCategory.selectCategory()
    .then((result)=> response(res, 200, true, result.rows, "get Category success"))
    .catch((err)=> response(res, 404, false, err, "get Category fail"))
  },

  insert:(req,res, next) => {
    console.log(req.body.name)
    modelCategory.insertCategory(req.body)
    .then((result)=> response(res, 200, true, result.rows, "input Category success"))
    .catch((err)=> response(res, 404, false, err, "input Category fail"))
  },
  
  update:(req,res,next) => {
    modelCategory.updateCategory(req.params.id,req.body.name)
    .then((result)=> response(res, 200, true, result.rows, "update Category success"))
    .catch((err)=> response(res, 404, false, err, "update Category fail"))
  },

  delete:(req,res,next) => {
    modelCategory.deleteCategory(req.params.id)
    .then((result)=> response(res, 200, true, result.rows, "delete Category success"))
    .catch((err)=> response(res, 404, false, err, "delete Category fail"))
  },

  getCategoryById:(req,res,next) => {
    modelCategory.selectCategoryById(req.params.id)
    .then((result)=> response(res, 200, true, result.rows, "get Category success"))
    .catch((err)=> response(res, 404, false, err, "get Category fail"))
  },
};

exports.CategoryController = CategoryController;