const Pool = require("../config/db");

  const selectCartById = (id) =>
  new Promise((resolve, reject) => {
    Pool.query(`Select carts.id,carts.amount,carts.price,products.name as product FROM carts INNER JOIN products ON carts.product_id = products.id WHERE carts.id=${id}`, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

  const selectCart = () => Pool.query(`Select carts.id,carts.amount,carts.price,products.name as product FROM carts INNER JOIN products ON carts.product_id = products.id`);

  const select = () => Pool.query(` Select price from carts`)
// Insert carts
const insertCart = (datacarts) => {
  const { amount, price, product_id } = datacarts;

  return Pool.query(
    `INSERT INTO carts(amount,price,product_id)VALUES(${amount}, ${price},${product_id})`
  );
};

//update carts
const updateCart = (id, datacarts) => {
  const { amount, price} = datacarts;
  return Pool.query(
    `UPDATE carts SET amount=${amount},price=${price} WHERE id='${id}'`
  );
};

//delete carts
const deleteCart = (id) =>
  Pool.query(`DELETE FROM carts where id='${id}'`);

const deleteCartt = () =>
  Pool.query(`DELETE FROM carts `);

module.exports = {
  selectCart,
  selectCartById,
  insertCart,
  deleteCart,
  updateCart,
  deleteCartt,
  select
};
