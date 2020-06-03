import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { StoreState } from '../types';
import Loader from './Loader';
import SingleProduct from './SingleProduct';

import styled from 'styled-components';

const Box = styled.div`
    background: #fff;
    margin: 1em 0;
    padding: 1em;
    box-shadow: 0 0 2px 0 #bbb;
`;

const Orders: FC = () => {
    const orders = useSelector((state: StoreState) => state.orders.orders);

    const loader: boolean = useSelector((state: StoreState): boolean => state.orders.loader);

    if (loader) {
        return <Loader />;
    }

    return (
        <>
            <h1>Orders</h1>
            {orders && orders.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1).map((order, i) => (
                <Box key={i}>
                    <h6>Id: <b>{order.id}</b></h6>
                    <h6>Created: <b>{order.createdAt}</b></h6>
                    <h6>Name: <b>{order.lastName}, {order.firstName}</b></h6>
                    <h6>Premium Delivery: <b>{order.isPremium ? 'yes' : 'no'}</b></h6>
                    <h6>Country: <b>{order.country}</b></h6>
                    {order.products.map((product, i) => <SingleProduct key={i} id={product.id} units={product.units} price={product.price || 0} showUnits={false} />)}
                </Box>
            ))}
        </>
    );
};

export default Orders;
