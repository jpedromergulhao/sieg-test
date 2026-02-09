import { X, Heart } from "lucide-react";
import { ProductModal } from "./ProductModal";
import { useProductsContext } from "../context/ProductsContext";
import { useState, useEffect } from "react";
import type { Product } from "../types/products";
import ProductCard from "./ProductCard";

export function FavProductsModal() {
    const { favProducts, setOpenFavProducts } = useProductsContext();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpenFavProducts(false);
        };
        window.addEventListener("keydown", handleEsc);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "unset";
        };
    }, [setOpenFavProducts]);

    return (
        <div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-blue-950/40 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setOpenFavProducts(false)}
        >
            <div
                className="relative flex flex-col w-full max-w-6xl max-h-[85vh] rounded-3xl bg-blue-50 shadow-2xl dark:bg-blue-900 overflow-hidden animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-6 border-b border-blue-100 dark:border-blue-800 bg-white dark:bg-blue-950">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold text-blue-950 dark:text-white">
                            My Favorites ({favProducts.length})
                        </h2>
                    </div>
                    <button
                        onClick={() => setOpenFavProducts(false)}
                        className="p-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-800 rounded-full transition-colors text-blue-900 dark:text-blue-100"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {favProducts.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {favProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    setSelectedProduct={setSelectedProduct}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="mb-4 rounded-full bg-blue-100 p-6 dark:bg-blue-800/50">
                                <Heart size={48} className="text-blue-300" />
                            </div>
                            <h3 className="text-xl font-bold text-blue-950 dark:text-white">
                                No favorites yet
                            </h3>
                            <p className="text-blue-900/60 dark:text-blue-200/60">
                                Explore our catalog and click the heart icon to save products here.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
}