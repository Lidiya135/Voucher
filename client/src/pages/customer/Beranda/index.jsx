import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Beranda.module.css";
import Navbarr from "../../../components/Navbar";
import Cart from "../Cart";
import swal from "sweetalert";
import Button from "react-bootstrap/Button";

export default function Beranda() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const getData = () => {
    axios
      .get(`http://localhost:3009/product?limit=6&page=${page}`)
      .then((res) => {
        console.log("get data succes");
        console.log(res.data);
        res.data && setData(res.data.data);
      })
      .catch((err) => {
        console.log("get data fail");
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const masukKeranjang = async (price, id) => {
    axios
      .get(`http://localhost:3009/cart/${id}`)
      .then((res) => {
        if (res.data.data.length == 0) {
          let form = {
            amount: 1,
            product_id: id,
            price,
          };
          axios
            .post(`http://localhost:3009/cart`, form)
            .then((res) => {
              console.log(res, "Post success");
              swal(
                "Success",
                "Memasukkan product ke keranjang success",
                "success"
              );

              window.location.reload(false);
            })
            .catch((err) => {
              console.log(err);
              swal(
                "Warning",
                "Memasukkan product ke keranjang failed",
                "error"
              );
            });
        } else {
          let form = {
            amount: res.data.data[0].amount + 1,
            product_id: id,
            price: res.data.data[0].price + price,
          };
          axios
            .post(`http://localhost:3009/cart/${res.data.data[0].id}`, form)
            .then((res) => {
              console.log(res);
              swal("Success", "Update product success", "success");
            })
            .catch((err) => {
              console.log(err);
              swal("Warning", "Post product failed", "error");
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const next = () => {
    setPage(page + 1);
  };

  const back = () => {
    if (page === 0) {
      setPage((page = 1));
    } else {
      setPage(page - 1);
    }
  };

  return (
    <div className={styles.pages}>
      <div className={styles.foods}>
        <Navbarr />
        <div className={styles.title}>
        </div>
        <hr />
        <div className={styles.gambar}>
        {data?.map((p) => (
            <div
              key={p.id}
              onClick={() => masukKeranjang(p.price, p.id)}
              className={styles.boxgbr}
            >
              <img src={p.photo} />
              <span> {p.name} </span><br/>
              <span>{p.price}</span>
            </div>
          ))}
        </div>
        <div className={styles.pagination}>
          <div className={styles.next}>
            <Button title="back" className={styles.qty} onClick={back}>
              {" "}
              back{" "}
            </Button>{" "}
            <h6> Page {page} </h6>
            <Button title="next" className={styles.qty} onClick={next}>
              {" "}
              next{" "}
            </Button>{" "}
          </div>
        </div>
      </div>
      <div className={styles.transaksi}>
        <Cart />
      </div>
    </div>
  );
}
