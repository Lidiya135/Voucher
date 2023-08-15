const Pool = require("../config/db");

//Select Data Category
const selectCategory = () => Pool.query("SELECT * FROM category");

const selectDataCategorybyId = (id) =>
  new Promise((resolve, reject) => {
    Pool.query(`select * from category where id = '${id}' `, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

// Insert Category
const insertCategory = (dataCategory) => {
  const { name, photo } = dataCategory;

  return Pool.query(
    `INSERT INTO category(name,photo)VALUES('${name}','${photo}')`
  );
};

//update category
const updateCategory = (id, dataCategory) => {
  const { name, photo } = dataCategory;
  return Pool.query(
    `UPDATE category SET name='${name}',photo='${photo}' WHERE id='${id}'`
  );
};

//delete category
const deleteCategory = (id) =>
  Pool.query(`DELETE FROM category where id='${id}'`);

module.exports = {
  selectCategory,
  selectDataCategorybyId,
  insertCategory,
  deleteCategory,
  updateCategory,
};
