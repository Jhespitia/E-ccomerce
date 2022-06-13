import { configureStore } from "@reduxjs/toolkit";
import  isLoading  from "./Slices/isLoading.slice";
import  products  from "./Slices/Products.slice";
import  purchases  from "./Slices/Purchases.slice";
import  cart  from "./Slices/Cart.slice";


export default configureStore({
    reducer: {isLoading, products, purchases, cart}
});