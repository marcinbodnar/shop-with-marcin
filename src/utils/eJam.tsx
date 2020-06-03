import { BasketProduct } from '../types';

export const MAX_QUANTITY = 12;
const DISCOUNT = 0.05;
const PREMIUM_DELIVERY = 15;
export const FREE_PREMIUM_DELIVERY = 12;

class EJam {
    fetchOrders = async () => {
        const response = await fetch('https://api.jsonbin.io/b/5ed6e7327741ef56a566e456');
        return response.json();
    }

    fetchProducts = async () => {
        const response = await fetch('https://api.jsonbin.io/b/5ed6ec7979382f568bd20356');
        return response.json();
    }

    calculateTotalProductPrice = (price: number, units: number): number =>
        units > 1
            ? Math.floor(((price + (price * (1 - ((units - 1) * DISCOUNT)))) * units) / 2) + 0.99
            : ((price + (price * (1 - ((units - 1) * DISCOUNT)))) * units) / 2

    calculateTotalPrice = (products: Array<BasketProduct>, premiumDelivery: boolean): number => {
        const allUnits = products.reduce((x, a) => x + a.units, 0);

        return products.reduce((x, a) => x + a.price, 0) + ((premiumDelivery && allUnits !== FREE_PREMIUM_DELIVERY)
            ? PREMIUM_DELIVERY
            : 0);
    }
}

export const eJam = new EJam();
