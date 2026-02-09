import { useEffect, useState } from "react";
import { X, Heart, ShoppingCart, CheckCircle2, CheckIcon } from "lucide-react";
import type { Product } from "../types/products";
import { Stars } from "./Stars";
import { useProductsContext } from "../context/ProductsContext";

interface ProductModalProps {
    product: Product;
    onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
    const { favProducts, addToFavorites, removeFromFavorites, addToCart } = useProductsContext();

    const [activeImage, setActiveImage] = useState<string>(product.images[0]);
    const [isAdded, setIsAdded] = useState<boolean>(false); //Estado para animação de confirmação de adição do produto
    const alreadyExists = favProducts.some(p => p.id === product.id);

    const handleAddToFavorites = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (alreadyExists) {
            removeFromFavorites(product.id);
        } else {
            addToFavorites(product);
        }
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        addToCart(product);
        setIsAdded(true);

        setTimeout(() => {
            setIsAdded(false);
        }, 2000);
    };

    // fechar com ESC e travar scroll
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleEsc);
        document.body.style.overflow = "hidden"; // aqui trava scroll ao abrir

        return () => {
            window.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "unset"; // aqui libera scroll ao fechar
        };
    }, [onClose]);

    const finalPrice = product.discountPercentage
        ? product.price * ((100 - product.discountPercentage) / 100)
        : product.price;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-blue-950/40 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl dark:bg-blue-950 sm:overflow-hidden animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                <button
                    onClick={onClose}
                    aria-label="Close modal"
                    className="absolute cursor-pointer right-4 top-4 z-20 rounded-full bg-blue-50 p-2 text-blue-900 transition-transform hover:scale-110 active:scale-90 dark:bg-blue-900 dark:text-blue-50"
                >
                    <X size={20} />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="bg-blue-50/50 p-6 dark:bg-blue-900/20">
                        <div className="aspect-square w-full overflow-hidden rounded-2xl bg-white dark:bg-blue-900/40">
                            <img
                                src={activeImage}
                                alt={product.title}
                                loading="lazy"
                                className="h-full w-full object-contain p-4"
                            />
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {product.images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveImage(img)}
                                    aria-label="Open image"
                                    className={`h-16 w-16 cursor-pointer overflow-hidden rounded-lg border-2 transition-all ${activeImage === img ? "border-blue-600 scale-105" : "border-transparent opacity-60 hover:opacity-100"
                                        }`}
                                >
                                    <img src={img} loading="lazy" className="h-full w-full object-cover" alt={product.title} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col p-8">
                        <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600">
                            <span>{product.category}</span>
                            <span className="h-1 w-1 rounded-full bg-blue-300" />
                            <div className="flex items-center gap-1 text-green-600">
                                <CheckCircle2 size={14} />
                                <span>{product.stock} in stock</span>
                            </div>
                        </div>

                        <h2 className="mb-2 text-2xl font-extrabold text-blue-950 dark:text-white md:text-3xl">
                            {product.title}
                        </h2>

                        <div className="mb-6 flex items-center gap-3">
                            <Stars value={product.rating} />
                            <span className="text-sm font-medium text-blue-400">
                                ({product.reviewCount} reviews)
                            </span>
                        </div>

                        <div className="mb-6">
                            <p className="text-sm leading-relaxed text-blue-900/80 dark:text-blue-100/70">
                                {product.description}
                            </p>
                        </div>

                        <div className="mb-8 flex items-baseline gap-3">
                            <span className="text-3xl font-black text-blue-950 dark:text-white">
                                ${finalPrice.toFixed(2)}
                            </span>
                            {product.discountPercentage > 0 && (
                                <span className="text-lg text-blue-300 line-through">
                                    ${product.price.toFixed(2)}
                                </span>
                            )}
                        </div>

                        <div className="mt-auto flex flex-col gap-3 sm:flex-row">
                            <button
                                onClick={(e) => handleAddToCart(e)}
                                disabled={isAdded}
                                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl py-4 font-bold text-white transition-all duration-300 active:scale-95 shadow-lg ${isAdded
                                    ? "bg-green-500 shadow-green-200 dark:shadow-none scale-105"
                                    : "bg-blue-600 hover:bg-blue-700 shadow-blue-200 dark:shadow-none"
                                    }`}
                            >
                                {isAdded ? (
                                    <div className="flex items-center gap-2 animate-in zoom-in duration-300">
                                        <CheckIcon size={20} strokeWidth={3} />
                                        <span>ADDED TO CART</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 animate-in fade-in duration-500">
                                        <ShoppingCart size={20} />
                                        <span>ADD TO CART</span>
                                    </div>
                                )}
                            </button>

                            <button
                                type="button"
                                aria-label="Add to favorites"
                                onClick={(e) => handleAddToFavorites(e)}
                                className="cursor-pointer rounded-full bg-blue-50/90 p-3 text-blue-900 shadow-sm backdrop-blur-sm transition-all hover:bg-blue-100 dark:bg-blue-900/80 dark:text-blue-100 dark:hover:bg-blue-950/40"
                            >
                                <Heart
                                    className={`h-5 w-5 transition-colors ${alreadyExists
                                        ? "fill-blue-900 text-blue-900 dark:fill-blue-100 dark:text-blue-100"
                                        : ""}`}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}