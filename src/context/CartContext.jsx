import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (meal) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.idMeal === meal.idMeal);
      if (existing) {
        return prev.map((i) =>
          i.idMeal === meal.idMeal ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...meal, qty: 1 }];
    });
  };

  const removeFromCart = (idMeal) => {
    setItems((prev) => prev.filter((i) => i.idMeal !== idMeal));
  };

  const changeQty = (idMeal, delta) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.idMeal === idMeal ? { ...i, qty: i.qty + delta } : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  const clearCart = () => setItems([]);

  const totalCount = items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        changeQty,
        clearCart,
        totalCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
