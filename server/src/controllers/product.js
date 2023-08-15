const ModelProducts = require("./../models/product");
const { response } = require("../middleware/common");
const cloudinary = require("../config/cloudinary");

const ProductsController = {
  getProduct: (req, res, next) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const sort = req.query.sort || "asc";
    const sortBy = req.query.sortBy || "name";
    const search = req.query.search || "";
    ModelProducts.selectData(sortBy, sort, limit, page, search)
      .then((result) =>
        response(res, 200, true, result.rows, "get data success")
      )
      .catch((err) => response(res, 404, false, err, "get data fail"));
  },

  getProductDetail: (req, res, next) => {
    ModelProducts.selectDataById(req.params.id)
      .then((result) => {
        response(res, 200, true, result.rows, "get data success");
      })
      .catch((err) => response(res, 404, false, err, "get data fail"));
  },

  insert: async (req, res, next) => {
    req.body.price = parseInt(req.body.price);
    req.body.category_id = parseInt(req.body.category_id);
    const data = {
      name: req.body.name,
      price: req.body.price,
      photo: req.body.photo,
      category_id: req.body.category_id,
    };
    console.log(data);
    console.log(req.file, "reqfileeee controll");

    if (req.file) {
      const image = await cloudinary.uploader.upload(req.file.path, {
        folder: "products_blanja",
      });
      data.photo = image.url;
    } else {
      data.photo = products.photo;
    }

    console.log(data);
    ModelProducts.insertData(data)
      .then((result) =>
        response(res, 200, true, result.rows, "Insert data succes")
      )
      .catch((err) => response(res, 404, false, err, "insert data fail"));
  },

  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      console.log(id);
      req.body.price = parseInt(req.body.price);
      req.body.category_id = parseInt(req.body.category_id);
      console.log(req.body, "beforeee");
      console.log(req.files, "reqfile");

      if (req.file) {
        const image = await cloudinary.uploader.upload(req.file.path, {
          folder: "products_blanja",
        });
        req.body.photo = image.url;
      } else {
        req.body.photo = products.photo;
      }

      console.log(req.body, "tengh");

      const updateProduct = await ModelProducts.updateData(id, req.body);
      console.log(req.body);
      response(res, 200, true, updateProduct.rows, "update users success");
    } catch (err) {
      response(res, 404, false, err.message, "update users fail ");
    }
  },

  delete: (req, res, next) => {
    ModelProducts.deleteData(req.params.id)
      .then((result) =>
        response(res, 200, true, result.rows, "delete data success")
      )
      .catch((err) => response(res, 404, false, err, "delete data fail"));
  },
};

exports.ProductsController = ProductsController;
