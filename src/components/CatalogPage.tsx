import { useMemo, useState } from "react";
import { useProducts } from "../hooks/useProducts"
import { filterProducts, sortProducts } from "../helpers/filter";
import type { Filters, SortOption } from "../types/catalog";
import { Filter } from "./Filter";
import { Products } from "./Products";

const filterInitialState: Filters = {
    categories: [],
    rating: null,
    priceRange: [0, 5000],
    search: ""
}

export function CatalogPage() {
    const { products, status, fetchProducts } = useProducts();

    const [sortBy, setSortBy] = useState<SortOption | null>(null);
    const [filters, setFilters] = useState<Filters>(filterInitialState);

    const visibleProducts = useMemo(() => {
        const filtered = filterProducts(products, filters); //Função helper para filtro
        return sortProducts(filtered, sortBy); //Função helper para ordenação
    }, [products, filters, sortBy]);

    //Extrair apenas as categorias dos produtos
    const categories = useMemo(
        () => Array.from(new Set(products.map(p => p.category))).sort(),
        [products]
    );

    return (
        <>
            <Filter
                categories={categories}
                filters={filters}
                setFilters={setFilters}
                sortBy={sortBy}
                setSortBy={setSortBy}
                filterInitialState={filterInitialState}
            />
            <Products
                products={visibleProducts}
                status={status}
                fetchProducts={fetchProducts}
                setFilters={setFilters}
                filterInitialState={filterInitialState}
            />
        </>
    )
}