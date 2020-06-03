
import {
    SET_BASKET,
    SET_UNITS,
    SET_PREMIUM_DELIVERY,
    SET_PRICE,
    SetBasket,
    SetUnits,
    SetPremiumDelivery,
    SetPrice,

} from '../../types';

import { Basket } from '../../types';

const initialState: Basket = {
    products: [],
    premiumDelivery: false,
    price: 0
};

export default function basket(state: Basket = initialState, action: (SetBasket | SetUnits | SetPremiumDelivery | SetPrice)): Basket {
    switch (action.type) {
    case SET_BASKET:
        return action.data;
    case SET_UNITS:
        return {
            ...state,
            products: state.products.map((product) => ({
                ...product,
                units: product.id === action.data.productId ? action.data.units : product.units,
                price: product.id === action.data.productId ? action.data.price : product.price
            }))
        };
    case SET_PREMIUM_DELIVERY:
        return {
            ...state,
            premiumDelivery: action.data.premiumDelivery
        };
    case SET_PRICE:
        return {
            ...state,
            price: action.data.price
        };
    default:
        return state;
    }
}
