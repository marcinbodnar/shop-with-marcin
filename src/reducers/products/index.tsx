
import {
    SET_PRODUCTS,
    SET_LOADER,
    SetProducts,
    SetLoader

} from '../../types';

import { Products } from '../../types';

export default function products(state: Products = {}, action: (SetProducts | SetLoader)): Products {
    switch (action.type) {
    case SET_PRODUCTS:
        return {
            ...action.data,
            loader: false
        };
    case SET_LOADER:
        return {
            ...state,
            loader: action.data
        };
    default:
        return state;
    }
}
