import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import type { ProductCardData } from "@/components/ProductCard";

// Shared by every "Add to Cart" button (ProductCard, wherever it's rendered).
// Logged in: adds immediately and shows a confirmation toast.
// Logged out: remembers the item in CartContext's pendingItem and sends the
// user to log in — login/register add it to the cart once auth succeeds.
export function useAddToCart() {
  const { isAuthenticated } = useAuth();
  const { addItem, setPendingItem } = useCart();
  const navigate = useNavigate();

  return (product: ProductCardData) => {
    const cartItem = { id: product.id, name: product.name, price: product.price, img: product.image };

    if (isAuthenticated) {
      addItem(cartItem);
      toast.success("Added to cart", { description: product.name });
      return;
    }

    setPendingItem(cartItem);
    navigate({ to: "/login" });
  };
}
