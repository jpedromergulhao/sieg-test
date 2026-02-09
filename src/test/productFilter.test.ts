import { filterProducts } from "../helpers/filter";
import { it, expect } from "vitest";

it("filters by category and price", () => {
    const products = [
        { id: 1, category: "beauty", price: 5 },
        { id: 2, category: "tech", price: 100 },
    ];

    const filters = {
        categories: ["beauty"],
        priceRange: [0, 10],
        search: ""
    };

    const result = filterProducts(products as any, filters as any);

    expect(result).toHaveLength(1);
});