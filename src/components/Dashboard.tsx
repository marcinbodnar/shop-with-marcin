import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Products from './Products';
import Orders from './Orders';
import OrderForm from './OrderForm';
import PageContainer from './PageContainer';
import Basket from './Basket';
import GlobalStyle from './GlobalStyle';

import { handleInitialData } from '../actions';

const Dashboard: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(handleInitialData());
    }, []);
    
    return (
        <>
            <GlobalStyle />
            <PageContainer
                title='Shop with Marcin'
                text='Start shopping'
            >
                <Basket>
                    <Products />
                    <OrderForm />
                </Basket>
                <Orders />
            </PageContainer>
        </>
    );
};

export default Dashboard;
