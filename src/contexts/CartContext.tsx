import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export interface CartItem {
  id: string;
  productId: string;
  vendorId: string;
  name: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  image: string;
  vendor: {
    name: string;
    location: string;
  };
  shipping: {
    cost: number;
    estimatedDays: number;
  };
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getShippingTotal: () => number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('abuja-mall-cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('abuja-mall-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (newItem: Omit<CartItem, 'id'>) => {
    const existingItem = items.find(item => 
      item.productId === newItem.productId && item.vendorId === newItem.vendorId
    );

    if (existingItem) {
      setItems(items.map(item =>
        item.id === existingItem.id
          ? { ...item, quantity: item.quantity + newItem.quantity }
          : item
      ));
      toast({
        title: "Cart Updated",
        description: `${newItem.name} quantity updated`,
      });
    } else {
      const cartItem: CartItem = {
        ...newItem,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      };
      setItems([...items, cartItem]);
      toast({
        title: "Added to Cart",
        description: `${newItem.name} added to your cart`,
      });
    }
  };

  const removeFromCart = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    setItems(items.filter(item => item.id !== itemId));
    if (item) {
      toast({
        title: "Removed from Cart",
        description: `${item.name} removed from your cart`,
      });
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setItems(items.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart Cleared",
      description: "All items removed from cart",
    });
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const price = item.discountPrice || item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const getShippingTotal = () => {
    return items.reduce((total, item) => total + item.shipping.cost, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        getShippingTotal,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};