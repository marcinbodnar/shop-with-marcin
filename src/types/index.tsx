
export interface StoreState {
    products: Products;
    orders: Orders;
    basket: Basket;
}

export interface Orders {
    loader: boolean;
    orders?: Array<Order>;
}

export interface Products {
    [key: string]: Product | any;
}

export interface Product {
    name: string;
    price: number;
}

export interface Order {
    id: string;
    products: Array<OrderProducts>;
    createdAt: string;
    country: string;
    firstName: string;
    lastName: string;
    units: number;
    isPremium: boolean;
}

export interface OrderProducts {
    id: string;
    units: number;
    price?: number;
}

export interface BasketProducts {
    id: string;
    units: number;
}

export interface Basket {
    products: Array<BasketProduct>;
    premiumDelivery: boolean;
    price: number;
}

export interface BasketProduct {
    id: string;
    units: number;
    price: number;
}

export interface Validators {
    [key: string]: (value: string) => boolean;
}

export interface FormText {
    [key: string]: FormFieldText;
}

export interface FormFieldText {
    title: string;
    errorMessage: string;
}

export interface FormState {
    [key: string]: FormFieldState;
}

export interface FormFieldState {
    value: string;
    isInvalid: boolean;
}

export interface PageContainerProps {
    title: string;
    text: string;
}

export interface BasketDetails {
    products: Array<BasketDetailsProduct>;
    premiumDelivery: boolean;
    price: number;
    allUnits: number;
}

export interface BasketDetailsProduct {
    id: string;
    units: number;
    price: number;
    details: Product;
}

export interface SingleProductProps {
    id: string;
    units: number;
    price: number;
    showUnits: boolean;
}


export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_LOADER = 'SET_LOADER';

export interface SetProducts {
    type: typeof SET_PRODUCTS;
    data: Products;
}

export interface SetLoader {
    type: typeof SET_LOADER;
    data: boolean;
}


export const SET_BASKET = 'SET_BASKET';
export const SET_UNITS = 'SET_UNITS';
export const SET_PREMIUM_DELIVERY = 'SET_PREMIUM_DELIVERY';
export const SET_PRICE = 'SET_PRICE';

export interface SetBasket {
    type: typeof SET_BASKET;
    data: Basket;
}

export interface SetUnits {
    type: typeof SET_UNITS;
    data: {
        productId: string;
        units: number;
        price: number;
    };
}

export interface SetPremiumDelivery {
    type: typeof SET_PREMIUM_DELIVERY;
    data: {
        premiumDelivery: boolean;
    };
}

export interface SetPrice {
    type: typeof SET_PRICE;
    data: {
        price: number;
    };
}


export const SET_ORDERS = 'SET_ORDERS';
export const ADD_ORDER = 'ADD_ORDER';
export const SET_LOADER_ORDERS = 'SET_LOADER_ORDERS';

export interface SetOrders {
    type: typeof SET_ORDERS;
    data: Array<Order>;
}

export interface AddOrder {
    type: typeof ADD_ORDER;
    data: Order;
}

export interface SetLoaderOrders {
    type: typeof SET_LOADER_ORDERS;
    data: boolean;
}
