import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { filterCategory } from "./../Store/Slices/Products.slice";
import NavBar from "../NavBar/NavBar";
import '../Styles/productDetail.css';
import Footer from '../Footer/Footer';
import { addToCart } from '../Store/Slices/Cart.slice';


const ProductDetails = () => {

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.products);

  useEffect(() => {
    axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/')
      .then(res => {
        //console.log(res)
        const productSearch = res.data.data.products.find(productSearch => productSearch.id === Number(id));
        setProduct(productSearch);
        dispatch(filterCategory(productSearch?.category.id));

      });

  }, [dispatch, id]);

  //console.log(productList);

  const addCart = () => {
    const cart = {
      id: id,
      quantity: quantity
    }
    dispatch(addToCart(cart));
    //console.log(addCart)
  }



  return (
    <div>

      <NavBar />

      <div className='bigt'>
        <h1 className='product-title'>{product?.title}</h1>
      </div>

      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="true">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1">
          </button>

          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2">
          </button>

          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3">
          </button>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev">
          <span className="prev carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <div className="carousel-inner">
          <div className="carousel-item active" >
            <img
              src={product?.productImgs?.[0]}
              className=" ima d-block " alt="" />
          </div>

          <div className="carousel-item">
            <img
              src={product?.productImgs?.[1]}
              className="ima d-block " alt="" />
          </div>

          <div className="carousel-item">
            <img
              src={product?.productImgs?.[2]}
              className="ima d-block " alt="" />
          </div>
        </div>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next">
          <span
            className="carousel-control-next-icon"
            aria-hidden="true">
          </span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className='detail' >
        <h3 className='card-header'>{product?.title}</h3>
        <p className="info card-text">{product?.description}</p>
        <div className="card-footer text-muted">
          Price: ${product?.price}
          <div className='quantity'>Quantity: {quantity}
            <div>
            <button
                className='btn-secondary'
                value={quantity}
                onClick={() => setQuantity(quantity - 1)}
                disabled={quantity <= 0}
              > - </button> <button
                className='btn-secondary'
                value={quantity}
                onClick={() => setQuantity(quantity + 1)}
              > +
              </button> 
            </div>
          </div>
        </div>

        <div className="card-footer text-muted">
          <button
            onClick={addCart}
            className='bt-detail btn btn-secondary'> add to cart</button>
        </div>
      </div>

      <div>
        <h3 className='similar-title'>Similar Products</h3>
      </div>

      <Row xs={1} md={2} lg={3} className="g-3 mt-3">
        {productList.map((product) => (
          <Col
            className='similar-card'
            key={product.id}>
            <Card
              className="card border-primary mb-3 "
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
              </Card.Body>

            </Card>
            <div className="text-muted">Price: <br /> ${product.price} USD</div>

            <Card.Footer className="line" />
          </Col>
        ))}
      </Row>
      <Footer />  

    </div>
  )
}

export default ProductDetails;