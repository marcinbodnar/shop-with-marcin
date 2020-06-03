import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { MAX_QUANTITY } from '../utils/eJam';

import { SingleProductProps, StoreState, Product } from '../types';

import { handleProducts as handleProductsBasket } from '../actions/basket';

const image = require('../images/1.jpg');

import styled from 'styled-components';

const Box = styled.div`
    background: #fff;
    margin: 1em 0;
    padding: 1em;
    box-shadow: 0 0 2px 0 #bbb;
`;

const CustomProduct = styled.div`
    display: flex;
    flex-flow: row wrap;
    align-items: center;

    & > * {
        padding: 1em;
    }

    @media (max-width: 768px) {
        flex-flow: column wrap;
    }
`;

const Image = styled.div`
    order: 1;
`;

const Title = styled.div`
    order: 2;
    flex: 1 0px;
    font-size: 16px;
`;

const Units = styled.div`
    order: 3;
    display: flex;
    align-items: center;
    width: 6em;

    button {
        width: 2em;
        border-radius: 0px;
        border: 1px solid #999;
        padding: 0.5em;
    }

    div {
        width: 2em;
        height: 2.1em;
        border: 1px solid #999;
        text-align: center;
        line-height: 2em;

        @media (max-width: 768px) {
            height: 2em;
        }
    }
`;

const Price = styled.div`
    order: 4;
    width: 10em;
    text-align: left;

    @media (max-width: 768px) {
        text-align: center;
    }
`;

const SingleProduct: FC<SingleProductProps> = ({ id, units, price, showUnits }) => {

    const product: Product = useSelector((state: StoreState): Product => {
        return state.products[id];
    });

    const dispatch = useDispatch();

    return (
        <Box>
            <CustomProduct>
                <Title>{product.name}</Title>
                <Image><img src={image} alt="" /></Image>
                <Units>
                    {showUnits
                        ? (
                            <>
                                <button
                                    disabled={units === 0}
                                    onClick={() => dispatch(handleProductsBasket(id, units - 1))}
                                >-</button>
                                <div>{units}</div>
                                <button
                                    disabled={units === MAX_QUANTITY}
                                    onClick={() => dispatch(handleProductsBasket(id, units + 1))}
                                >+</button>
                            </>
                        ) : (
                            <span>
                                Units: {units}
                            </span>
                        )}
                </Units>
                <Price>
                    <h1>{price.toFixed(2)}</h1>
                    <h6>unit price: {product.price.toFixed(2)}</h6>
                </Price>
            </CustomProduct>
        </Box>
    );
};

export default SingleProduct;
