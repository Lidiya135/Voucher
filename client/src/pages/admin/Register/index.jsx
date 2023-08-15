import React, { useState } from "react";
import { registerUser } from "../../../redux/actions/register";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "../../customer/Register/Register.module.css";

export default function RegisterAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const postData = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    console.log(fullname);
    let data = {
      email,
      password,
      fullname,
    };
    dispatch(registerUser(data, navigate));
  };

  return (
    <div>
      <section className={styles.containerRegister}>
        <div className={styles.content}>
          <p>Please login with your account</p>
          <div className={styles.swictacount}>
            <Link to="/registerCustomer">
              <button type="button" className={styles.btn_customer}>
                Customer
              </button>
            </Link>
            <button
              type="button"
              style={{ backgroundColor: "#db3022" }}
              className={styles.btn_seller}
            >
              Admin
            </button>
          </div>
          <form
            onSubmit={postData}
            className="container mt-5 col-12 text-center"
          >
            <input
              type="email"
              className="form-control mb-3"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
            <input
              type="password"
              className="form-control mb-3"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
            <input
              type="fullname"
              className="form-control mb-5"
              value={fullname}
              name="fullname"
              onChange={(e) => setFullname(e.target.value)}
              placeholder="fullname"
            />
            <button type="submit" className="btn btn-danger col-9">
              Register
            </button>
          </form>
          <div className={styles.register}>
            <span>
              Don't have a account? <Link to="/loginAdmin">Login</Link>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
