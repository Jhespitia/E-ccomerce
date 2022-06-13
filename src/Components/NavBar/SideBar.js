import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Offcanvas } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toBuy, removeFromCart } from '../Store/Slices/Cart.slice';
import remove from '../Assets/Images/remove.png'
import '../Styles/sideBar.css'

const SideBar = ({ show, handleClose }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();          

    // toBuy is a function that is imported from Cart.slice.js

    const cartProducts = useSelector((state) => state.cart);

    const selectCart = (product) => {
        handleClose();
        navigate(`/products/${product.id}`)
    }

    let total = 0;

    if (cartProducts?.length > 0) {
        if (cartProducts?.length > 1) {
            total = cartProducts?.reduce((initial, current) => {
                if (typeof initial === 'number') {
                    return initial + (current.price * current.productsInCart?.quantity)
                } else {
                    return (initial.price * initial.productsInCart?.quantity) + (current.price * current.productsInCart?.quantity)
                }
            });
        } else {
            total = cartProducts?.[0].price * cartProducts?.[0].productsInCart?.quantity
        }
    }

    return (
        <div>
            <Offcanvas
                className="sidebar"
                show={show}
                onHide={handleClose}
                placement='end'>
                <Offcanvas.Header className='header-side'
                    closeButton>
                    <Offcanvas.Title>Shooping Cart</Offcanvas.Title>
                </Offcanvas.Header >
                <Offcanvas.Body>
                    <div >
                        {cartProducts?.map((product) => (
                            <div
                                key={product.id}>
                                <div
                                    className='card-side'
                                    onClick={() => selectCart(product)}>
                                    <div className='side-brand'>{product.brand} 
                                    </div>
                                    <div className='side-title'>{product.title}</div>
                                    <hr className='linea' />
                                    <div
                                        className='side-quantity'>Quantity: {product.productsInCart.quantity}
                                        <div className='side-price'>Price: $ {product.price}</div>

                                        <div className='subtotal'>Subtotal: $ {product.price * product.productsInCart.quantity}</div>
                                        <img 
                                        className='remove' src={remove} alt=""
                                        onClick={() => dispatch(removeFromCart(product.id))} />
                                    </div>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </Offcanvas.Body>
                <div className='side-footer'>
                    <div className='total'>
                        Total :
                    </div>
                    <div className='total-price'>
                        $ {total}
                    </div>

                    <button
                        onClick={() => dispatch(toBuy())}
                        className='side-btn btn btn-secondary'
                    >Checkout
                    </button>

                </div>
            </Offcanvas>
        </div>
    )
}

export default SideBar;