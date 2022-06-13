import React, { useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { getPurchases } from '../Store/Slices/Purchases.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../Styles/purchases.css';


const Purchases = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const purchases = useSelector((state) => state.purchases);


  useEffect(() => {
    dispatch(getPurchases());
  }, [dispatch])

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
 
  return (
    <div>
      <NavBar />
      <h1 className='purchases'>My Purchases</h1>

      <div className='card-p'>
        {
          purchases.map((purchase) => (
            <div
              className='purchase-card'
              key={purchase.id}>
              <div className='purchase-date'>
                {new Date(purchase.createdAt).toLocaleDateString('en-US', options)} 
              
              </div><hr /> {/*==>DATE<==*/}
              {purchase.cart.products.map((product) => (
                
                <div
                  className='purchase-product'
                  key={product.title}
                  onClick={() => navigate(`/products/${product.id}`)}> {product.title}
                  <br />
                    <div className='purchase-price'>Price:
                      $ {product.price}
                    </div>
                    <div className='purchase-unit'>Units: {product.productsInCart.quantity}
                    </div>
                    <hr />
                </div>
        
              ))}
            </div>
          ))
        }
      </div>

      <Footer />
    </div>
  )
}

export default Purchases;