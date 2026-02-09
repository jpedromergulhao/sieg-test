import { Filter as FilterIcon, RotateCcw } from "lucide-react";
import type { Filters, SortOption } from "../types/catalog";
import { useEffect, useState } from "react";

interface FilterProps {
    categories: string[];
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    sortBy: SortOption | null;
    setSortBy: React.Dispatch<React.SetStateAction<SortOption | null>>;
    filterInitialState: Filters;
}

export function Filter({ categories, filters, setFilters, sortBy, setSortBy, filterInitialState }: FilterProps) {
    const [searchInput, setSearchInput] = useState<string>("");

    const activeFiltersCount = [
        filters.categories.length > 0,
        filters.priceRange[0] !== filterInitialState.priceRange[0] || filters.priceRange[1] !== filterInitialState.priceRange[1],
        filters.rating !== null
    ].filter(Boolean).length;

    const clampPrice = (value: number) => Math.max(0, value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFilters((prev) => ({
                ...prev,
                search: searchInput
            }));
        }, 300);

        return () => clearTimeout(timer);
    }, [searchInput, setFilters]);

    return (
        <section className="sticky top-16 z-40 w-full border-b border-blue-100 bg-blue-100 backdrop-blur-sm transition-colors dark:border-blue-800 dark:bg-blue-900/95">
            <div className="container mx-auto px-4 py-3">
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between sm:gap-4">

                    <div className="flex flex-col items-center gap-4 text-sm sm:flex-row sm:flex-wrap">
                        <div className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
                            <FilterIcon size={18} />
                            <span className="font-semibold">Filters</span>
                            {activeFiltersCount > 0 && (
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
                                    {activeFiltersCount}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col w-full sm:w-auto">
                            <label htmlFor="category-select" className="sr-only">Category</label>
                            <select
                                id="category-select"
                                className="w-full sm:w-auto rounded-md cursor-pointer border-blue-200 bg-white p-2 text-blue-900 focus:ring-2 focus:ring-blue-500 dark:border-blue-700 dark:bg-blue-950 dark:text-blue-50"
                                value={filters.categories[0] || ""}
                                onChange={(e) => setFilters(f => ({ ...f, categories: e.target.value ? [e.target.value] : [] }))}
                            >
                                <option className="cursor-pointer" value="">All categories</option>
                                {categories.map(cat => (
                                    <option key={cat} className="cursor-pointer" value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center justify-center gap-2">
                            <label className="text-xs font-medium text-blue-800 dark:text-blue-200">Price:</label>
                            <input
                                type="number"
                                aria-label="Minimum price"
                                className="w-20 rounded-md border border-blue-200 bg-white p-1.5 text-sm text-blue-900 dark:border-blue-700 dark:bg-blue-950 dark:text-blue-50"
                                value={filters.priceRange[0]}
                                onChange={(e) => setFilters(f => ({ ...f, priceRange: [clampPrice(Number(e.target.value)), f.priceRange[1]] }))}
                            />
                            <span className="text-blue-400">/</span>
                            <input
                                type="number"
                                aria-label="Maximum price"
                                className="w-20 rounded-md border border-blue-200 bg-white p-1.5 text-sm text-blue-900 dark:border-blue-700 dark:bg-blue-950 dark:text-blue-50"
                                value={filters.priceRange[1]}
                                onChange={(e) => setFilters(f => ({ ...f, priceRange: [f.priceRange[0], clampPrice(Number(e.target.value))] }))}
                            />
                        </div>

                        <input
                            type="text"
                            placeholder="Search product by name"
                            className="rounded-md border border-blue-200 bg-white p-1.5 text-sm text-blue-900 dark:border-blue-700 dark:bg-blue-950 dark:text-blue-50"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-3">
                        <select
                            aria-label="Sort by"
                            className="w-full sm:w-auto rounded-md cursor-pointer border-blue-200 bg-white p-2 text-sm text-blue-900 dark:border-blue-700 dark:bg-blue-950 dark:text-blue-50"
                            value={sortBy ?? ""}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                        >
                            <option className="cursor-pointer" value="">Sort by</option>
                            <option className="cursor-pointer" value="price-asc">Lowest price</option>
                            <option className="cursor-pointer" value="price-desc">Highest price</option>
                            <option className="cursor-pointer" value="rating-desc">Best rating</option>
                        </select>

                        {(activeFiltersCount > 0 || sortBy) && (
                            <button
                                onClick={() => { setFilters(filterInitialState); setSortBy(null); }}
                                className="flex cursor-pointer items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                            >
                                <RotateCcw size={14} />
                                <span>Clean Filters</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}