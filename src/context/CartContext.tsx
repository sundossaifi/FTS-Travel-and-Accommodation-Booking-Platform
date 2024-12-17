import { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
    roomId: string;
    roomType: string;
    price: number;
    roomPhotoUrl: string;
    roomNumber: string
    hotelName:string
}

interface CartContextProps {
    cart: CartItem[];
    addToCart: (room: CartItem) => void;
    removeFromCart: (roomId: string) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (room: CartItem) => {
        setCart((prevCart) => [...prevCart, room]);
    };

    const removeFromCart = (roomId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.roomId !== roomId));
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
}
