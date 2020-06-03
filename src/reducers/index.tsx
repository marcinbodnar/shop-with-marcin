import { combineReducers } from 'redux';

import orders from './orders';
import products from './products';
import basket from './basket';

export default combineReducers({
    products,
    orders,
    basket
}) as any;
