import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { eJam } from '../utils/eJam';

import {
    StoreState,
    Basket,
    SET_BASKET, 
    SET_UNITS, 
    SET_PREMIUM_DELIVERY, 
    SET_PRICE,
    SetBasket,
    SetUnits,
    SetPremiumDelivery,
    SetPrice

} from '../types';

const setBasket = (products: Basket): SetBasket => ({
    type: SET_BASKET,
    data: products
});

export const setUnits = (productId: string, units: number, price: number): SetUnits => ({
    type: SET_UNITS,
    data: {
        productId: productId,
        units: units,
        price: price
    }
});

export const setPremiumDelivery = (premiumDelivery: boolean): SetPremiumDelivery => ({
    type: SET_PREMIUM_DELIVERY,
    data: {
        premiumDelivery: premiumDelivery
    }
});

export const setPrice = (price: number): SetPrice => ({
    type: SET_PRICE,
    data: {
        price: price
    }
});

export const handlePremiumDelivery = (premiumDelivery: boolean): ThunkAction<void, StoreState, unknown, Action<string>> => (dispatch, getState) => {
    dispatch(setPremiumDelivery(premiumDelivery));
    dispatch(setPrice(eJam.calculateTotalPrice(getState().basket.products, getState().basket.premiumDelivery)));
};

export const handleProducts = (productId: string, units: number): ThunkAction<void, StoreState, unknown, Action<string>> => (dispatch, getState) => {
    dispatch(setUnits(
        productId,
        units,
        eJam.calculateTotalProductPrice(
            getState().products[productId].price, 
            units
        )
    ));
    dispatch(setPrice(
        eJam.calculateTotalPrice(
            getState().basket.products,
            getState().basket.premiumDelivery
        )
    ));
};

export const handleBasket = (): ThunkAction<void, StoreState, unknown, Action<string>> => dispatch => {
    dispatch(setBasket(basket));
};

const basket: Basket = {
    products: [
        {
            id: '1',
            units: 0,
            price: 0
        },
        {
            id: '2',
            units: 0,
            price: 0
        },
        {
            id: '3',
            units: 0,
            price: 0
        }
    ],
    premiumDelivery: false,
    price: 0
};
