import type { Filters, SortOption } from "../types/catalog";
import type { Product } from "../types/products";

export function sortProducts(
    products: Product[],
    sortBy: SortOption | null
): Product[] {
    const sorted = [...products];

    const byPriceAsc = (a: Product, b: Product) =>
        a.price - b.price || b.rating - a.rating;

    const byPriceDesc = (a: Product, b: Product) =>
        b.price - a.price || b.rating - a.rating;

    const byRatingDesc = (a: Product, b: Product) =>
        b.rating - a.rating || a.price - b.price;

    switch (sortBy) {
        case "price-asc":
            return sorted.sort(byPriceAsc);

        case "price-desc":
            return sorted.sort(byPriceDesc);

        case "rating-desc":
            return sorted.sort(byRatingDesc);

        default:
            return sorted;
    }
}

export function filterProducts(products: Product[], filters: Filters) {
    const query = filters.search?.toLocaleLowerCase().trim() ?? "";

    return products.filter((product) => {
        //categoria
        const matchesCategory =
            !filters.categories?.length ||
            filters.categories.includes(product.category);

        //preço
        const matchesPrice =
            !filters.priceRange ||
            (product.price >= filters.priceRange[0] &&
                product.price <= filters.priceRange[1]);

        //nome
        const nameMatch = (product.title?.toLocaleLowerCase() ?? "").includes(query);

        return matchesCategory && matchesPrice && nameMatch;
    });
}
