import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { eJam } from '../utils/eJam';

import {
    Order,
    StoreState,
    SET_ORDERS,
    ADD_ORDER,
    SET_LOADER_ORDERS,
    SetOrders,
    AddOrder,
    SetLoaderOrders
} from '../types';

import { handleBasket } from './basket';

const setOrders = (orders: Array<Order>): SetOrders => ({
    type: SET_ORDERS,
    data: orders
});

export const addOrder = (order: Order): AddOrder => ({
    type: ADD_ORDER,
    data: order
});

export const setLoaderOrders = (loader: boolean): SetLoaderOrders => ({
    type: SET_LOADER_ORDERS,
    data: loader
});

export const handleAddOrders = (order: Order): ThunkAction<void, StoreState, unknown, Action<string>> => (dispatch, getState) => {
    dispatch(setLoaderOrders(true));

    const newOrder = {
        ...order,
        products: order.products && order.products.map((product) => ({
            ...product,
            price: getState().products.loader 
                ? 0 
                : eJam.calculateTotalProductPrice(
                    getState().products[product.id].price,
                    product.units
                )
        }))
    };
    dispatch(addOrder(newOrder));
    dispatch(handleBasket());

    dispatch(setLoaderOrders(false));
};

export const handleOrders = (): ThunkAction<void, StoreState, unknown, Action<string>> => async (dispatch, getState) => {
    dispatch(setLoaderOrders(true));

    const data = await eJam.fetchOrders();
    const orders = data.map((order: Order) => ({
        ...order,
        products: order.products && order.products.map((product) => ({
            ...product,
            price: getState().products.loader 
                ? 0 
                : eJam.calculateTotalProductPrice(
                    getState().products[product.id].price,
                    product.units
                )
        }))}
    ));

    dispatch(setOrders(orders));
    dispatch(setLoaderOrders(false));
};
