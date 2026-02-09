import { AlertCircle, RefreshCcw, SearchXIcon } from "lucide-react";
import type { Filters } from "../types/catalog";
import type { Product } from "../types/products";
import ProductCard from "./ProductCard";
import type { Status } from "../hooks/useProducts";
import { ProductSkeleton } from "./ProductSkeleton";
import { useState } from "react";
import { ProductModal } from "./ProductModal";

interface ProductsProps {
    products: Product[];
    status: Status,
    fetchProducts: () => void;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    filterInitialState: Filters;
}

export function Products({ products, status, setFilters, fetchProducts, filterInitialState }: ProductsProps) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    return (
        <section
            id="products"
            className="min-h-screen bg-blue-100 p-4 transition-colors dark:bg-blue-900/95 md:p-10"
        >
            <div className="container mx-auto">
                {status === "loading" && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <ProductSkeleton key={i} />
                        ))}
                    </div>
                )}

                {status === "error" && (
                    <div
                        className="mx-auto flex max-w-md flex-col items-center justify-center py-20 text-center"
                        role="alert"
                    >
                        <div className="mb-6 rounded-full bg-red-50 p-6 dark:bg-red-900/20">
                            <AlertCircle className="h-12 w-12 text-red-500" />
                        </div>

                        <h3 className="mb-2 text-2xl font-bold text-blue-950 dark:text-blue-50">
                            Oops! Something went wrong.
                        </h3>

                        <p className="mb-8 leading-relaxed text-blue-900/70 dark:text-blue-200/70">
                            We are unable to load the products at this time.
                            Please check your connection or try again.
                        </p>

                        <button
                            onClick={() => fetchProducts()}
                            className="group flex cursor-pointer items-center gap-2 rounded-full bg-blue-600 px-8 py-3 font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95 dark:bg-blue-500 dark:hover:bg-blue-400"
                        >
                            <RefreshCcw className="h-4 w-4 transition-transform group-hover:rotate-180" />
                            TRY AGAIN
                        </button>
                    </div>
                )}

                {status === "success" && products.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                setSelectedProduct={setSelectedProduct}
                            />
                        ))}
                    </div>
                )}

                {status === "success" && products.length === 0 && (
                    <div className="mx-auto flex max-w-md flex-col items-center justify-center py-20 text-center text-blue-950 dark:text-blue-50">
                        <div className="mb-6 rounded-full bg-blue-50 p-6 shadow-inner dark:bg-blue-800/30">
                            <SearchXIcon className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="mb-2 text-2xl font-bold">No products found.</h3>
                        <p className="mb-8 opacity-80">
                            We found no results for the applied filters. Try adjusting your selections.
                        </p>
                        <button
                            onClick={() => setFilters(filterInitialState)}
                            className="cursor-pointer rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-200 dark:shadow-none"
                        >
                            CLEAN FILTERS
                        </button>
                    </div>
                )}
            </div>

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </section>
    );
}