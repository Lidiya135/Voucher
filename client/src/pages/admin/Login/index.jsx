import React, { useState } from 'react';
import { loginUser } from '../../../redux/actions/login';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from '../../customer/Login/login.module.css';

export default function LoginAdmin() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const postData = (e) =>{
    e.preventDefault()
    console.log(email)
    console.log(password)
    let data = {
      email,password
    }
    dispatch(loginUser(data,navigate))
  }

  return (
    <div>
      <section className={styles.containerLogin}>
          <div className={styles.content}>
            <p>Please login with your account</p> 
            <div className={styles.swictacount}>
              <button type="button" style={{'backgroundColor': '#db3022'}} className={styles.btn_customer}>
                Admin
              </button>
              <Link to="/loginCustomer" >
              <button type="button" className={styles.btn_seller}>
                Customer
              </button>
              </Link>
            </div>
            <form onSubmit={postData} className="container mt-5 col-12 text-center">
                  <input type="email" className="form-control mb-2" value={email} name="email" onChange={(e)=>setEmail(e.target.value)}  placeholder="email"/>
                  <input type="password" className="form-control mb-5"  value={password} name="password" onChange={(e)=>setPassword(e.target.value)}  placeholder="password"/>
                  <button type='submit' className='btn btn-danger col-9'>Login</button>
            </form>
            <div className={styles.register}>
          <p>
            Don't have a account? <Link to="/registerAdmin">Register</Link>
          </p>
        </div>
      </div>
    </section>
  </div>
  )
}