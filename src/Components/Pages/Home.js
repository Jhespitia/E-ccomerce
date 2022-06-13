import React, { useEffect, useState } from "react";
import axios from "axios";
import { filterCategory, filterTitle, getProducts } from "./../Store/Slices/Products.slice";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from '../Store/Slices/Cart.slice';
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import '../Styles/home.css';


const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);

  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());

    axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
      .then(res => setCategories(res.data.data.categories));

  }, []);
  //console.log(categories);

  const filterProducts = () => {
    dispatch(filterTitle(search)); //toLowerCase()
  }

  const selectCategory = (id) => {
    dispatch(filterCategory(id))
  }

  const addCart = () => {
    const cart = {
      id: id,
      quantity: quantity
    }
    dispatch(addToCart(cart));
    //console.log(addCart)
  }

  return (
    <div className="home">

      <NavBar
        search={search}
        setSearch={setSearch}
        filterProducts={filterProducts}
        categories={categories}
        setCategories={setCategories}
        selectCategory={selectCategory}
      />

      <div className="search">
        <input
          className="form-control me-sm-2"
          type="text"
          placeholder="Search Item"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />

        <button
          className="btn btn-secondary my-2 my-sm-0"
          type="submit"
          onClick={filterProducts}
        >Search
        </button>
      </div>

      <Row xs={1} md={2} lg={3} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <Card
              className="card border-primary mb-3"
              key={product.id}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/products/${product.id}`)}
            >

              <Card.Img
                className="card-img"
                //variant="top" 
                src={product.productImgs[2]}
              />
              <Card.Img
                className="img-over"
                //variant="top" 
                src={product.productImgs[0]}
              />

              <Card.Body className="card-body">
                <Card.Title>{product.title}</Card.Title>

                {/* <Card.Text>{product.description}</Card.Text> */}
              </Card.Body>
            </Card>
            <div className="text-muted">Price: <br /> ${product.price} USD</div>
            <Card.Footer className="line" />
          </Col>
          
        ))}
      </Row>
      <div className="container my-5">
      </div>
      <Footer /> 
    </div>
  );
};

export default Home;