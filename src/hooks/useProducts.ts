import { useEffect, useState } from "react"
import type { Product } from "../types/products";

export type Status = "loading" | "success" | "error"

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<Status>("loading")

  // Optei por usar um arquivo products.json no projeto e simular latência com setTimeout (300ms)
  // Porem existe um tratamento de erro, caso migre para uma api

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const data: { products: Product[] } = await import("../../data/products.cleaned.json");
        setProducts(data.products);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    }, 300)

    return () => clearTimeout(timer);
  }, [])

  const fetchProducts = async () => {
    setStatus("loading");
    try {
      const data: { products: Product[] } = await import("../../data/products.cleaned.json");
      setProducts(data.products);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  return { products, status, fetchProducts }
}