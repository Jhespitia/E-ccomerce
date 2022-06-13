import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from "./isLoading.slice";
import axios from 'axios';
import getConfig from '../../Utils/getConfig';

export const PurchasesSlice = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {
        setPurchases: (state, action) => {
            return action.payload;
        }
    }
})

export const { setPurchases } = PurchasesSlice.actions;

// export const getPurchases = () => (dispatch) => {
//     dispatch(setIsLoading(true));
//     return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/purchases' , getConfig())
//         .then((res) => dispatch(setPurchases(res.data.data.purchases)))
//         .finally(() => dispatch(setIsLoading(false)));
// }

export const getPurchases = () => {
    return dispatch => {
        dispatch(setIsLoading(true));
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', getConfig())
            .then(res => {
                const purchases = res.data.data.purchases.sort((a, b) => {
                    const prevDate = new Date(a.createdAt)
                    const nextDate = new Date(b.createdAt)
                    console.log(a.createdAt)
                    return nextDate - prevDate;
                });
                console.log(purchases)
                dispatch(setPurchases(purchases));
            })
            .finally(() => dispatch(setIsLoading(false)));
    }
}

export default PurchasesSlice.reducer;
