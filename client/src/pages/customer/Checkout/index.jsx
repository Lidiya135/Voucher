import React, { useEffect, useState } from "react";
import "./Checkout.module.css";
import axios from "axios";
import styles from "./Checkout.module.css";
import Navbarr from "../../../components/Navbar";

export default function Checkout() {
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

  const voucher = (totalPrice) => {
    const potongan = 10000;
    const minTotal = 2000000;
    let discount = 0;
    let code = "";

    if (totalPrice >= minTotal) {
      discount = Math.floor(totalPrice / minTotal) * potongan;
      code = generateCode();
    }
    return {
      discount: discount,
      code: code,
    };
  };

  const generateCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const codeLength = 10;
    let code = "";

    for (let i = 0; i < codeLength; i++) {
      const randomCode = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomCode);
    }
    return code;
  };

  const expired = () => {
    const today = new Date();
    const expireDate = new Date(today);
    expireDate.setMonth(expireDate.getMonth() + 3);
    return expireDate.toDateString();
  };

  const example = totalPrice;
  const { discount, code } = voucher(example);
  const expireCode = expired();
  // console.log(discount);
  // console.log(code);
  // console.log(expireCode);

  return (
    <div className={styles.container}>
      <Navbarr />
      <h2>Invoice Product and Voucher</h2>
      <div className={styles.page}>
        <div className={styles.invoice}>
          <h5>My Invoice</h5>
          {data?.map((p) => (
            <div className={styles.product}>
              <span>{p.product}</span>
              <span>Rp. {p.price}</span>
            </div>
          ))}
          <hr />
          <div className={styles.product}>
            <h6>Total Price</h6>
            <h6>Rp. {totalPrice}</h6>
          </div>
          <hr />
          <div className={styles.product}>
            <h6>Total Pay</h6>
            <h6>Rp. {totalPrice - discount} </h6>
          </div>
        </div>

        <div className={styles.voucher}>
          <h5>My Voucher</h5>
          <span>Congrats, you get voucher. </span>
          <div className={styles.product}>
            <span>
              {" "}
              {code} <br /> expired : {expireCode}
            </span>
            <span>Rp. {discount}</span>
          </div>
          <hr />
          <div className={styles.product}>
            <h6>Total</h6>
            <h6>Rp. {discount} </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
