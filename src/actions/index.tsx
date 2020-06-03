import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { StoreState } from '../types';

import { handleBasket } from './basket';
import { handleProducts } from './products';
import { handleOrders } from './orders';


export const handleInitialData = (): ThunkAction<void, StoreState, unknown, Action<string>> => async dispatch => {
    await dispatch(handleProducts());
    await dispatch(handleBasket());
    await dispatch(handleOrders());
};
