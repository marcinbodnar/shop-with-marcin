import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { eJam } from '../utils/eJam';

import { 
    StoreState,
    Products,
    SET_PRODUCTS,
    SET_LOADER,
    SetProducts,
    SetLoader,
} from '../types';

const setProducts = (products: Products): SetProducts => ({
    type: SET_PRODUCTS,
    data: products
});

const setLoader = (loader: boolean): SetLoader => ({
    type: SET_LOADER,
    data: loader
});

export const handleProducts = (): ThunkAction<void, StoreState, unknown, Action<string>> => async dispatch => {
    dispatch(setLoader(true));
    dispatch(setProducts(
        await eJam.fetchProducts()
    ));
};
