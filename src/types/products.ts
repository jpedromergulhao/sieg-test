export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    reviewCount: number;
    category: string;
    thumbnail: string;
    images: string[];
    stock: number;
    discountPercentage: number;
}