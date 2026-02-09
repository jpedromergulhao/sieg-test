export type SortOption =
    | "price-asc"
    | "price-desc"
    | "rating-desc"

export type Filters = {
    categories: string[];
    rating: number | null;
    priceRange: [number, number];
    search: string;
};