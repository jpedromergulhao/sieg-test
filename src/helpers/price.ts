import type { Product } from "../types/products";

export const formatPrice = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

export const finalPrice = (product: Product): number => {
        return product.discountPercentage
            ? product.price * ((100 - product.discountPercentage) / 100)
            : product.price;
    }