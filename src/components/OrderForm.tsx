import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import dateFormat from 'dateformat';

import { handleAddOrders } from '../actions/orders';

import { 
    StoreState, 
    Order, 
    Validators, 
    FormText, 
    FormState, 
    BasketProducts
} from '../types';

import styled from 'styled-components';

const Box = styled.div`
    background: #fff;
    margin: 1em 0;
    padding: 1em;
    box-shadow: 0 0 2px 0 #bbb;
`;

const Form = styled.div`
    display: flex;
    flex-flow: row wrap;

    @media (max-width: 768px) {
        flex-flow: column wrap;
    }
`;

const Input = styled.div`
    padding: 0 1em 0.5em 0;

    input {
        width: 20em;
        height: 2em;
        line-height: 2em;

        @media (max-width: 768px) {
            width: 16em;
        }
    }
`;

const Error = styled.div`
    color: red;
    padding: 0 0 0 0;
    font-size: 12px;
    line-height: 18px;
    height: 1em;
`;
const formText: FormText = {
    firstName: {
        title: 'First Name',
        errorMessage: 'too short'
    },
    lastName: {
        title: 'Last Name',
        errorMessage: 'too short'
    },
    email: {
        title: 'Email',
        errorMessage: 'invalid email address'
    },
    phone: {
        title: 'Phone',
        errorMessage: 'invalid phone address'
    },
    streetName: {
        title: 'Street Name',
        errorMessage: 'too short'
    },
    city: {
        title: 'City',
        errorMessage: 'too short'
    },
    country: {
        title: 'Country',
        errorMessage: 'too short'
    },
};


const OrderForm: FC = () => {
    const initialState = Object.keys(formText).reduce((x, a) => ({
        ...x,
        [a]: {
            value: '',
            isInvalid: false
        }
    }), {});
    const [form, setForm] = useState<FormState>(initialState);

    const allUnits: number = useSelector((state: StoreState): number => state.basket.products.reduce((x, a) => {
        return x + a.units;
    }, 0));

    const products: Array<BasketProducts> = useSelector((state: StoreState): Array<BasketProducts> => state.basket.products.map((product) => ({
        id: product.id,
        units: product.units
    })));

    const premiumDelivery: boolean = useSelector((state: StoreState): boolean => state.basket.premiumDelivery);

    useEffect(() => {
        fetch('https://api.ipdata.co/?api-key=test')
            .then(res => res.json())
            .then((data) => {
                setForm({
                    ...form,
                    country: {
                        ...form.country,
                        value: data.country_name
                    }
                });
                
            });
    }, []);

    const validateEmail = (email: string): boolean => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleValidators = (field: string): boolean => {
        const isValid = validators[field](form[field].value);

        setForm({
            ...form,
            [field]: {
                ...form[field],
                isInvalid: !isValid
            }
        });

        return isValid;
    };

    const isValidPhoneNumber = (phoneNumber: string): boolean => {
        const re = /^(\+{1}\d{2,3}\s?[(]{1}\d{1,3}[)]{1}\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}$/;
        return re.test(phoneNumber);
    };

    const validators: Validators = {
        firstName: (value: string): boolean => value.length > 0,
        lastName: (value: string): boolean => value.length > 0,
        email: (value: string): boolean => validateEmail(value),
        phone: (value: string): boolean => isValidPhoneNumber(value),
        streetName: (value: string): boolean => value.length > 0,
        city: (value: string): boolean => value.length > 0,
        country: (value: string): boolean => value.length > 0,
    };

    const isLegit = (field?: string): boolean => {
        return field
            ? handleValidators(field)
            : Object.keys(validators).every(field => handleValidators(field));
    };

    const dispatch = useDispatch();

    const handleConfirm = () => {
        if (!isLegit() || !allUnits) {
            return false;
        }

        const order: Order = {
            id: uuidv4(),
            products: products,
            createdAt: dateFormat(new Date(), 'yyyy-mm-dd\'T\'HH:MM:ss.l+00:00'),
            country: form.country.value,
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            units: allUnits,
            isPremium: allUnits >= 12 || premiumDelivery
        };
        setForm(initialState);
        dispatch(handleAddOrders(order));
    };

    return (
        <Box>
            <Form>
                {Object.keys(formText).map((name, i) => (
                    <Input key={i}>
                        <h6>{formText[name].title}</h6>
                        <input
                            type="text"
                            name={name}
                            value={form[name].value}
                            onChange={e => setForm({
                                ...form,
                                [e.target.name]: {
                                    ...form[e.target.name],
                                    value: e.target.value
                                }
                            })}
                            onBlur={() => isLegit(name)}
                            style={{ borderColor: form[name].isInvalid ? 'red' : '' }}
                            autoComplete='off'
                            autoCorrect='off'
                            spellCheck='false'
                            tabIndex={i + 1}
                        />
                        <Error>{form[name].isInvalid && formText[name].errorMessage}</Error>
                    </Input>
                ))}
            </Form>

            <button
                onClick={handleConfirm}
                // disable={false}
            >CONFIRM</button>
        </Box>
    );
};

export default OrderForm;
