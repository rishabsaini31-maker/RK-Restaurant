import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (dish) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === dish.id);
      if (existing) {
        return prev.map(item => 
          item.id === dish.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      // Extract numeric price (e.g., "₹280" -> 280)
      const numericPrice = parseFloat(dish.price.replace(/[^0-9.]/g, '')) || 0;
      return [...prev, { ...dish, qty: 1, numericPrice }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, change) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + change;
        return { ...item, qty: newQty > 0 ? newQty : 1 };
      }
      return item;
    }).filter(item => item.qty > 0)); // also filter out if qty reaches 0
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.numericPrice * item.qty), 0);
  const taxes = subtotal * 0.05; // 5% GST
  const deliveryFee = subtotal > 0 ? 60 : 0;
  const total = subtotal + taxes + deliveryFee;

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      subtotal,
      taxes,
      deliveryFee,
      total,
      totalItems: cartItems.reduce((sum, item) => sum + item.qty, 0)
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
