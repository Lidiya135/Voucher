import { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import InsertData from "../../../components/Modal/AddProduct";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./MyProducts.module.css";
import EditProduct from "../../../components/Modal/EditProduct";

export default function MyProducts() {
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState({
    search: "",
  });
  const [sortBy, setSortBy] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const getData = () => {
    axios
      .get(
        `http://localhost:3009/product?search=${inputData.search}&sortBy=${sortBy}&sort=${sort}&limit=5&page=${page}`
      )
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

  useEffect(() => {
    getData();
  }, [inputData.search, sortBy, sort, page]);

  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
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

  const deleteData = (e, id) => {
    axios
      .delete(`http://localhost:3009/product/${id}`)
      .then((res) => {
        console.log("delete barang success");
        console.log(res);
        swal("Success", "Delete barang success", "success");
        getData();
        window.location.reload(false);
      })
      .catch((err) => {
        console.log("delete barang fail");
        console.log(err);
        swal("Warning", "Delete barang failed", "error");
      });
  };

  return (
    <>
      <div className="bg-secondary ">
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#">
                <h3>My Product</h3>
            </Navbar.Brand>
            <NavDropdown title="Auth" id="basic-nav-dropdown">
              <NavDropdown.Item href="/loginAdmin">Login Admin</NavDropdown.Item>
              <NavDropdown.Item href="/loginCustomer">
                Login Customer
              </NavDropdown.Item>
              <NavDropdown.Item href="/registerAdmin">Register Admin</NavDropdown.Item>
              <NavDropdown.Item href="/registerCustomer">Register Customer</NavDropdown.Item>
            </NavDropdown>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "50px" }}
                navbarScroll
              >
                <div
                  className={`btn ${
                    sortBy === "name" ? "btn-success" : "btn-outline-success"
                  } ms-1`}
                  onClick={() => setSortBy("name")}
                  style={{ width: "100px", borderRadius: "10px" }}
                >
                  <h6 className=" mt-1">Nama</h6>
                </div>
                <div
                  className={`btn ${
                    sortBy === "price" ? "btn-success" : "btn-outline-success"
                  } ms-3`}
                  onClick={() => setSortBy("price")}
                  style={{ width: "100px", borderRadius: "10px" }}
                >
                  <h6 className=" mt-1">Price</h6>
                </div>

                <div
                  className={`btn ${
                    sort === "asc" ? "btn-success" : "btn-outline-success"
                  } ms-5`}
                  onClick={() => setSort("asc")}
                  style={{ width: "100px", borderRadius: "10px" }}
                >
                  <h6 className=" mt-1">ASC</h6>
                </div>
                <div
                  className={`btn ${
                    sort === "desc" ? "btn-success" : "btn-outline-success"
                  } ms-3`}
                  onClick={() => setSort("desc")}
                  style={{ width: "100px", borderRadius: "10px" }}
                >
                  <h6 className=" mt-1">DESC</h6>
                </div>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={inputData.search}
                  name="search"
                  onChange={handleChange}
                />
                {/* <Button variant="outline-success">Search</Button> */}
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <section>
          <Table responsive="sm" className="text-center">
            <thead>
              <tr>
                <th>Photo Product</th>
                <th>Nama Product</th>
                <th>Price</th>
                <th>
                  <InsertData />
                </th>
              </tr>
            </thead>
            {data?.map((p) => (
              <tbody key={p.id}>
                <tr>
                  <td>
                    <img
                      src={p.photo}
                      style={{
                        width: "120px",
                        height: "74px",
                        borderRadius: "7px",
                      }}
                    />
                  </td>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>
                    <EditProduct data={p} />
                    <Button
                      variant="danger"
                      type="submit"
                      onClick={(e) => deleteData(e, p.id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Delete
                    </Button>{" "}
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </section>
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
    </>
  );
}
