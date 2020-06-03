import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { handlePremiumDelivery} from '../actions/basket';
import { StoreState, Product } from '../types';

import Loader from './Loader';
import SingleProduct from './SingleProduct';
import { FREE_PREMIUM_DELIVERY } from '../utils/eJam';
import { BasketDetails } from '../types';

import styled from 'styled-components';

const Summary = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
`;

const Delivery = styled.div`
    
`;

const TotalPrice = styled.div`
    display: flex;
    padding: 0 2em;

    div {
        width: 10em;
    }
`;

const Products: FC = () => {

    const loader: Product = useSelector((state: StoreState): Product => {
        return state.products.loader;
    });

    const basket: BasketDetails = useSelector((state: StoreState): BasketDetails => ({
        ...state.basket,
        products: state.basket.products.map((product) => ({
            ...product,
            details: state.products[product.id]
        })),
        allUnits: state.basket.products.reduce((x, a) => x + a.units, 0)
    }));

    const dispatch = useDispatch();

    if (loader) {
        return <Loader />;
    }

    return (
        <div>
            {basket.products && basket.products.map((product, i) => <SingleProduct key={i} id={product.id} units={product.units} price={product.price} showUnits={true} />)}

            <Summary>
                <Delivery>
                    {basket.allUnits >= FREE_PREMIUM_DELIVERY
                        ? <div style={{ color: 'green' }}>Free premium shipping and support</div>
                        : (
                            <div>
                                <input 
                                    type='checkbox' 
                                    name='premiumDelivery' 
                                    id='premiumDelivery'
                                    checked={basket.premiumDelivery ? true : false}
                                    onChange={() => dispatch(handlePremiumDelivery(!basket.premiumDelivery))}
                                />
                                <label htmlFor='premiumDelivery'>Premium shipping and support</label>
                            </div>
                        )
                    }
                </Delivery>
                <TotalPrice>
                    <div>
                        <h6>Total price:</h6>
                        <h1>{basket.price.toFixed(2)}</h1>
                    </div>
                </TotalPrice>
            </Summary>
        </div>
    );
};

export default Products;
