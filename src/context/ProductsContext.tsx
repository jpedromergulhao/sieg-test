import { createContext, useState, useContext, useEffect } from "react";
import type { Product } from "../types/products";

interface ProductsProviderProps {
    children: React.ReactNode;
}

export interface CartItem extends Product {
    quantity: number;
}

interface ProductsContextType {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    favProducts: Product[];
    cartProducts: CartItem[];
    addToFavorites: (product: Product) => void;
    removeFromFavorites: (id: number) => void;
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    cleanCart: () => void;
    updateQuantity: (id: number, amount: number) => void;
    totalProducts: number;
    openFavProducts: boolean;
    setOpenFavProducts: React.Dispatch<React.SetStateAction<boolean>>;
    openShoppingCart: boolean;
    setOpenShoppingCart: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const useProductsContext = () => {
    const context = useContext(ProductsContext);
    if (!context) throw new Error("useProductsContext must be used inside ProductsProvider");
    return context;
};

export function ProductsProvider({ children }: ProductsProviderProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [openFavProducts, setOpenFavProducts] = useState<boolean>(false);
    const [openShoppingCart, setOpenShoppingCart] = useState<boolean>(false);

    const [favProducts, setFavProducts] = useState<Product[]>(() => {
        const stored = localStorage.getItem("favProductsSieg");
        return stored ? JSON.parse(stored) : [];
    });

    const [cartProducts, setCartProducts] = useState<CartItem[]>(() => {
        const stored = localStorage.getItem("cartProductsSieg");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("favProductsSieg", JSON.stringify(favProducts));
    }, [favProducts]);

    useEffect(() => {
        localStorage.setItem("cartProductsSieg", JSON.stringify(cartProducts));
    }, [cartProducts]);

    const addToFavorites = (product: Product) =>
        setFavProducts((prev) =>
            prev.some((p) => p.id === product.id) ? prev : [...prev, product]
        );

    const removeFromFavorites = (id: number) =>
        setFavProducts((prev) => prev.filter((p) => p.id !== id));

    const addToCart = (product: Product) =>
        setCartProducts((prev) => {
            const exists = prev.find((p) => p.id === product.id);

            // Se o produto ja existir no carrinho ele aumenta a quantidade
            if (exists) {
                return prev.map((p) =>
                    p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                );
            }

            return [...prev, { ...product, quantity: 1 }];
        });

    const removeFromCart = (id: number) =>
        setCartProducts((prev) => prev.filter((p) => p.id !== id));

    const cleanCart = () => setCartProducts([]);

    const updateQuantity = (id: number, amount: number) =>
        setCartProducts((prev) =>
            prev
                .map((p) =>
                    p.id === id ? { ...p, quantity: p.quantity + amount } : p
                )
                .filter((p) => p.quantity > 0) //Se colocar uma quantidade abaixo de zero deletar o produto
        );

    const totalProducts = cartProducts.reduce(
        (acc, item) => acc + item.quantity,
        0
    );

    return (
        <ProductsContext.Provider
            value={{
                isLoading,
                setIsLoading,
                favProducts,
                cartProducts,
                addToFavorites,
                removeFromFavorites,
                addToCart,
                removeFromCart,
                cleanCart,
                updateQuantity,
                totalProducts,
                openFavProducts,
                setOpenFavProducts,
                openShoppingCart,
                setOpenShoppingCart,
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
}
