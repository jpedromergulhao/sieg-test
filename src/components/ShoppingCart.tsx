import { useEffect, useState } from "react";
import { X, ShoppingBag, Plus, Minus, Trash2, CheckCircle2, Loader2 } from "lucide-react";
import { useProductsContext } from "../context/ProductsContext";
import { finalPrice, formatPrice } from "../helpers/price";

export function ShoppingCart() {
    const {
        cartProducts,
        setOpenShoppingCart,
        updateQuantity,
        removeFromCart,
        cleanCart,
        totalProducts,
    } = useProductsContext();

    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const total = cartProducts.reduce((acc, item) => {
        const price = item.discountPercentage
            ? item.price * ((100 - item.discountPercentage) / 100)
            : item.price;
        return acc + price * item.quantity;
    }, 0);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpenShoppingCart(false);
        };
        window.addEventListener("keydown", handleEsc);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "unset";
        };
    }, [setOpenShoppingCart]);

    const handleCheckoutClick = () => {
        setIsCheckingOut(true);

        setTimeout(() => {
            setIsCheckingOut(false);
            setIsSuccess(true);
            cleanCart();

            setTimeout(() => {
                setOpenShoppingCart(false);
                setTimeout(() => setIsSuccess(false), 500);
            }, 3000);
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-[150] flex justify-end overflow-hidden">
            <div
                className="absolute inset-0 bg-blue-950/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
                onClick={() => !isCheckingOut && setOpenShoppingCart(false)}
            />

            <div className="relative h-full w-full sm:max-w-md transform bg-white dark:bg-blue-950 shadow-2xl transition-transform animate-in slide-in-from-right duration-500 ease-in-out">
                <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between p-6 border-b border-blue-100 dark:border-blue-800">
                        <h2 className="text-xl font-bold text-blue-950 dark:text-white flex items-center gap-2">
                            <ShoppingBag className="text-blue-600" /> My Cart
                        </h2>
                        <button
                            onClick={() => setOpenShoppingCart(false)}
                            className="rounded-full cursor-pointer p-2 text-blue-900 hover:bg-blue-50 dark:text-blue-100 dark:hover:bg-blue-900 transition-colors"
                            aria-label="Fechar carrinho"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {isSuccess ? (
                            <div className="flex h-full flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
                                <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-full mb-4 animate-bounce">
                                    <CheckCircle2 size={64} className="text-green-600 dark:text-green-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-blue-950 dark:text-white">Order Placed!</h3>
                                <p className="text-blue-900/60 dark:text-blue-200/60 mt-2">
                                    Thank you for shopping at SIEG Marketplace..
                                </p>
                            </div>
                        ) : cartProducts.length > 0 ? (
                            cartProducts.map((product) => (
                                <div key={product.id} className="flex gap-4 group animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-blue-100 bg-blue-50 dark:bg-blue-900/40">
                                        <img src={product.thumbnail} alt={product.title} className="h-full w-full object-contain p-2" />
                                    </div>
                                    <div className="flex flex-1 flex-col justify-between py-1">
                                        <div className="flex justify-between text-base font-bold text-blue-950 dark:text-blue-50">
                                            <h3 className="line-clamp-2 pr-2">{product.title}</h3>
                                            <p>{formatPrice(finalPrice(product) * product.quantity)}</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center rounded-lg border border-blue-100 dark:border-blue-800 bg-white dark:bg-blue-900">
                                                <button
                                                    onClick={() => updateQuantity(product.id, -1)}
                                                    className="p-1.5 cursor-pointer disabled:opacity-30"
                                                    disabled={product.quantity <= 1 || isCheckingOut}
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="px-4 font-semibold text-sm">{product.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(product.id, 1)}
                                                    className="p-1.5 cursor-pointer"
                                                    disabled={isCheckingOut}
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(product.id)}
                                                className="text-red-400 hover:text-red-600 p-2"
                                                disabled={isCheckingOut}
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex h-full flex-col items-center justify-center text-center p-10">
                                <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-full mb-4">
                                    <ShoppingBag size={48} className="text-blue-200" />
                                </div>
                                <p className="text-xl font-bold text-blue-950 dark:text-white">Your cart is empty</p>
                                <p className="text-sm text-blue-900/60 dark:text-blue-200/60 mt-2">How about adding some products?</p>
                            </div>
                        )}
                    </div>

                    {cartProducts.length > 0 && !isSuccess && (
                        <div className="border-t border-blue-100 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-900/40 p-6 space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-blue-900/70 dark:text-blue-200/70">
                                    <span>Quantity of Items:</span>
                                    <span className="font-medium">{totalProducts}</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-blue-950 dark:text-white pt-2">
                                    <span>Total:</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>
                            <button
                                onClick={handleCheckoutClick}
                                disabled={isCheckingOut}
                                className="w-full flex items-center justify-center cursor-pointer rounded-xl bg-blue-600 py-4 font-bold text-white shadow-lg transition-all hover:bg-blue-700 active:scale-[0.98] disabled:bg-blue-400 disabled:cursor-not-allowed"
                            >
                                {isCheckingOut ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        PROCESSING...
                                    </>
                                ) : (
                                    "FINALIZE PURCHASE"
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}