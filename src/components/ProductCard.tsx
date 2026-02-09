import { Heart } from "lucide-react";
import type { Product } from "../types/products";
import { Stars } from "./Stars";
import { useProductsContext } from "../context/ProductsContext";
import { formatPrice } from "../helpers/price";

interface Props {
    product: Product;
    setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>
}

export default function ProductCard({ product, setSelectedProduct }: Props) {
    const { favProducts, addToFavorites, removeFromFavorites } = useProductsContext();

    const finalPrice = product.discountPercentage
        ? product.price * ((100 - product.discountPercentage) / 100)
        : product.price;

    const alreadyExists = favProducts.some(p => p.id === product.id);

    const handleFavProductClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (alreadyExists) {
            removeFromFavorites(product.id);
        } else {
            addToFavorites(product);
        }
    };

    return (
        <div
            role="button"
            tabIndex={0}
            aria-label={`${product.title} card`}
            onClick={() => setSelectedProduct(product)}
            className="group relative cursor-pointer flex flex-col rounded-2xl border border-blue-200 bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl dark:border-blue-800 dark:bg-blue-950"
        >
            <div className="relative aspect-square overflow-hidden rounded-xl bg-blue-50/50 dark:bg-blue-900/20">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    loading="lazy"
                    className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110 dark:mix-blend-normal"
                />

                <button
                    type="button"
                    aria-label="Add to favorites"
                    onClick={(e) => { handleFavProductClick(e) }}
                    className="absolute right-2 top-2 z-10 cursor-pointer rounded-full bg-blue-50/90 p-2 text-blue-900 shadow-sm backdrop-blur-sm transition-all hover:bg-blue-100 dark:bg-blue-900/80 dark:text-blue-100 dark:hover:bg-blue-950/40"
                >
                    <Heart className={`h-4 w-4 transition-colors ${alreadyExists ? "fill-blue-900 text-blue-900 dark:fill-blue-100 dark:text-blue-100" : ""} `} />

                </button>
            </div>

            <div className="flex flex-1 flex-col pt-4 space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500">
                        {product.category}
                    </span>
                    {product.reviewCount > 0 && (
                        <div className="flex items-center gap-1 text-sm">
                            <Stars value={product.rating} />
                            <span className="text-xs text-blue-500">({product.reviewCount})</span>
                        </div>
                    )}
                </div>

                <h3 className="line-clamp-2 text-sm font-bold leading-tight text-blue-950 dark:text-blue-50 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {product.title}
                </h3>

                <div className="mt-auto flex items-end justify-between">
                    <div className="flex gap-3 items-center">
                        {product.discountPercentage > 0 && (
                            <span className="text-xs text-blue-400 line-through">
                                {formatPrice(product.price)}
                            </span>
                        )}
                        <div className="flex gap-2 items-center">
                            <span className="text-lg font-extrabold text-blue-950 dark:text-white">
                                {formatPrice(finalPrice)}
                            </span>
                            <span className="text-emerald-700 dark:text-emerald-100 transition-colors text-[10px] font-bold uppercase tracking-widest">
                                -{product.discountPercentage}% OFF
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}