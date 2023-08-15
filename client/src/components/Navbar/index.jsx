import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios';

function Navbarr() {
  const [data, setData] = useState([]);
  const id = localStorage.getItem("id");
  const getUser = () => {
    axios
      .get(`http://localhost:3009/user/${id}`)
      .then((res) => {
        console.log("get data succes");
        console.log(res.data);
        res.data && setData(res.data.data[0]);
      })
      .catch((err) => {
        console.log("get data fail");
        console.log(err);
      });
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <Navbar expand="lg">
      <Container style={{'height': "20px"}}>
        <Navbar.Brand href="#beranda">List Product</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#beranda">Home</Nav.Link>
            <NavDropdown title="Auth" id="basic-nav-dropdown">
              <NavDropdown.Item href="#loginAdmin">Login Admin</NavDropdown.Item>
              <NavDropdown.Item href="#loginCustomer">
                Login Customer
              </NavDropdown.Item>
              <NavDropdown.Item href="#registerAdmin">Register Admin</NavDropdown.Item>
              <NavDropdown.Item href="#registerCustomer">Register Customer</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <h6 style={{'paddingRight': '20px'}}>{data.fullname}</h6>
    </Navbar>
  );
}

export default Navbarr;