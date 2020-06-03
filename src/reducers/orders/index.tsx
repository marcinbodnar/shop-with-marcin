
import {
    SET_ORDERS,
    ADD_ORDER,
    SET_LOADER_ORDERS,
    SetOrders,
    AddOrder,
    SetLoaderOrders
} from '../../types';

import { Orders } from '../../types';

export default function orders(state: Orders = { loader: true }, action: (SetOrders | AddOrder | SetLoaderOrders)): Orders {
    switch (action.type) {
    case SET_ORDERS:
        return {
            ...state,
            orders: action.data
        };
    case ADD_ORDER:
        return {
            ...state,
            orders: [
                ...(state.orders || []),
                action.data
            ]
        };
    case SET_LOADER_ORDERS:
        return {
            ...state,
            loader: action.data
        };
    default:
        return state;
    }
}
