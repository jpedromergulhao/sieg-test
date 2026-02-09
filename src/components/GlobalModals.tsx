import { useProductsContext } from "../context/ProductsContext";
import { FavProductsModal } from "./FavProductsModal";
import { ShoppingCart } from "./ShoppingCart";

export function GlobalModals() {
  const { openFavProducts, openShoppingCart } = useProductsContext();

  return (
    <>
      {openFavProducts && <FavProductsModal />}
      {openShoppingCart && <ShoppingCart />}
    </>
  );
}