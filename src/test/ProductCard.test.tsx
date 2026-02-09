import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProductCard from "../components/ProductCard";
import { ProductsContext } from "../context/ProductsContext";

const mockProduct = {
  id: 1,
  title: "Test Product",
  description: "desc",
  price: 10,
  rating: 4,
  category: "test",
  thumbnail: "img.png",
  images: ["img.png"],
  discountPercentage: 0,
  reviewCount: 0,
  stock: 10,
};

describe("ProductCard", () => {
  it("adds product to favorites when heart is clicked", () => {
    const addToFavorites = vi.fn();

    render(
      <ProductsContext.Provider
        value={{
          isLoading: false,
          setIsLoading: vi.fn(),

          favProducts: [],
          cartProducts: [],

          addToFavorites,
          removeFromFavorites: vi.fn(),
          addToCart: vi.fn(),
          removeFromCart: vi.fn(),
          cleanCart: vi.fn(),
          updateQuantity: vi.fn(),

          totalProducts: 0,

          openFavProducts: false,
          setOpenFavProducts: vi.fn(),
          openShoppingCart: false,
          setOpenShoppingCart: vi.fn(),
        }}
      >
        <ProductCard product={mockProduct} setSelectedProduct={vi.fn()} />
      </ProductsContext.Provider>
    );

    fireEvent.click(
      screen.getByRole("button", { name: /add to favorites/i })
    );

    expect(addToFavorites).toHaveBeenCalledWith(mockProduct);
  });
});