import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from "./isLoading.slice";
import axios from 'axios';
import getConfig from '../../Utils/getConfig';
import { getPurchases } from './Purchases.slice';

export const CartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart : (state, action) => {
            return action.payload;
        }

    }
})

export const { setCart } = CartSlice.actions;

export const getCart = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart/', getConfig())
        .catch(err => console.log(err))
        .then((res) => dispatch(setCart(res.data.data.cart.products)))
        .finally(() => dispatch(setIsLoading(false)));
};

export const addToCart = (cart) => (dispatch) => {
    dispatch(setIsLoading(true));
    console.log(cart);
    return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart',cart, getConfig())
        .then(() => {
            dispatch(getCart());
            alert('Product added to cart');
        })
        .catch(err => console.log(err.response))
        .finally(() => dispatch(setIsLoading(false)));
};

export const toBuy = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', {}, getConfig())
        .then(() =>{
            dispatch(getPurchases());
            dispatch(setCart([]));
            
        })
        .finally(() => dispatch(setIsLoading(false)));
};

export const SignIn = data => {
    return dispatch => {
        dispatch(setIsLoading(true));
        return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users', data)
            .finally(() => dispatch(setIsLoading(false)));
    }
};

export const removeFromCart = productId => {
    return dispatch => {
        dispatch(setIsLoading(true));
        return axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${productId}`, getConfig())
            .then(() => dispatch(getCart()))
            .finally(() => setIsLoading(false));
    }
}

export default CartSlice.reducer;
