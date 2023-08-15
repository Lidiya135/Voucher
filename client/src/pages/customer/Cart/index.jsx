import React, { useEffect, useState } from "react";
import style from "./Cart.module.css";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";

export default function Cart() {
  const [data, setData] = useState([]);

  const getData = () => {
    axios
      .get(`http://localhost:3009/cart`)
      .then((res) => {
        console.log(res.data);
        res.data && setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  let totalPrice = 0;
  for (let i = 0; i < data.length; i++) {
    totalPrice += data[i].price;
  }

  const deleteData = () => {
    axios
      .delete(`http://localhost:3009/cart`)
      .then((res) => {
        console.log(res);
        swal("Success", "Delete barang success", "success");
        getData();
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
        swal("Warning", "Delete barang failed", "error");
      });
  };

  return (
    <div className={style.transac}>
      <div className={style.title}>
        <h2>New Customer</h2>
      </div>
      <h6>Your Cart</h6>
      {data?.map((t) => (
        <div key={t.id} className={style.table}>
          <p>{t.product}</p>
          <p></p>
          <p>{t.price}</p>
        </div>
      ))}
      <div className={style.table}>
        <p>Total</p>
        <p></p>
        <p>Rp. {totalPrice} </p>
      </div>
      <h5 onClick={() => deleteData()}>Clear Cart</h5>
      <Link to="/checkout">
      <div className={style.check}>
          <h4>Checkout</h4>
      </div>
        </Link>
    </div>
  );
}
